import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, } from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { Recipe } from '../models/recipe';
import { FirebaseService } from 'src/services/firebase.service';



@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.scss'],

})
export class AddRecipeComponent implements OnInit {
  addRecipeForm!: FormGroup;
  public recipe!: Recipe;
  db = firebase.firestore();
  auth = firebase.auth();
  public previewImage!: string;




  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService,) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm(): void {
    this.addRecipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      image: [''],
    });
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Create a FileReader to read the image file and set it as the image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
      // Set the selected image file as the image FormControl value
      this.addRecipeForm.patchValue({
        image: file
      });
    }
  }

  async addRecipe() {
    if (this.addRecipeForm.valid) {
      const user = this.auth.currentUser;
      if (!user) {
        console.log('no user try again');
        return;
      }
      const recipe = new Recipe();
      recipe.name = this.addRecipeForm.controls['name'].value;
      recipe.ingredients = this.addRecipeForm.controls['ingredients'].value;
      recipe.instructions = this.addRecipeForm.controls['instructions'].value;
      recipe.userId = user.displayName;
      recipe.createdAt = new Date();
      const imageFile = this.addRecipeForm.controls['image'].value;
      const imageFilePath = `images/${user.uid}/${Date.now()}_${imageFile.name}`;

      try {
        const storageRef = firebase.storage().ref(imageFilePath);
        await storageRef.put(imageFile);
        const imageUrl = await storageRef.getDownloadURL();
        recipe.image = imageUrl;
        const plainObject = { ...recipe };
        await this.db.collection('publicRecipesList').add(plainObject);
        // Show a success message
        // Clear the form
        this.addRecipeForm.reset();
        console.log(recipe);
        console.log(plainObject);
        console.log(recipe.image);
        console.log(imageUrl)
      } catch (error) {
        // Show an error message
        console.log(error!)
      }
    }
    else{
      console.log('notvalid')
    }
  }

  async addRecipeToPrivateList() {
    if (this.addRecipeForm.valid) {
      const user = this.auth.currentUser;
      if (!user) {
        // Show an error message
        return;
      }
      const recipe = new Recipe();
      recipe.name = this.addRecipeForm.controls['name'].value;
      recipe.ingredients = this.addRecipeForm.controls['ingredients'].value;
      recipe.instructions = this.addRecipeForm.controls['instructions'].value;
      recipe.userId = user.displayName;
      recipe.createdAt = new Date();
      this.db.collection(`users/${user.uid}/privateRecipes`).add(recipe)
        .then(() => {
          // Show a success message
          // Clear the form
          this.addRecipeForm.reset();
        })
        .catch((error) => {
          // Show an error message
        });
    }
  }

}



