import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService,) {}

  ngOnInit() {
    this.buildForm()
  }

  buildForm(): void {
    this.addRecipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  addRecipe() {
    if (this.addRecipeForm.valid) {
      const user = this.auth.currentUser;
      if (!user) {
        console.log('no user try again')
        return;
      } 
      const recipe =  new Recipe();

      
      recipe.name = this.addRecipeForm.controls['name'].value;
      recipe.ingredients = this.addRecipeForm.controls['ingredients'].value;
      recipe.instructions = this.addRecipeForm.controls['instructions'].value;
      recipe.userId = user.uid;
      recipe.createdAt = new Date;
      const plainObject = { ...recipe };
       
      this.firebaseService.addRecipe(plainObject)
     
        .then(() => {
          // Show a success message
          // Clear the form
          this.addRecipeForm.reset();
          console.log(recipe)
          console.log(plainObject)
        })
        .catch((error) => {
          // Show an error message
        });
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
      recipe.userId = user.uid;
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

    

