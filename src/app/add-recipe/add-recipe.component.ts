import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';
import { Recipe } from '../recipe';

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  recipeName: string="";
  recipeIngredients: string="";
  recipeInstructions: string="";
  addRecipeForm!: FormGroup;
  private recipeList: Recipe[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addRecipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  addRecipe() {
    if (this.addRecipeForm.valid) {
      const user = auth.currentUser;
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
      db.collection('publicRecipesList').add(recipe)
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
  async addRecipeToPrivateList() {
    if (this.addRecipeForm.valid) {
      const user = auth.currentUser;
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
      db.collection(`users/${user.uid}/privateRecipes`).add(recipe)
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

    

