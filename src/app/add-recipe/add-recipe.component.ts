import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.scss'],
})
export class AddRecipeComponent {
  recipeName: string ="";
  recipeIngredients: string="";
  recipeInstructions: string="";

  constructor() {}

  async addRecipeToPublicList() {
    const { recipeName, recipeIngredients, recipeInstructions } = this;
    try {
      const user = auth.currentUser;
      if (!user) {
        // Handle error for user not logged in
        return;
      }

      const publicRecipeList = db.collection('publicRecipeList');
      const recipeRef = await publicRecipeList.add({
        name: recipeName,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        addedBy: user.uid
      });
      // Reset form fields
      this.recipeName = '';
      this.recipeIngredients = '';
      this.recipeInstructions = '';
    } catch (err) {
      console.dir(err);
      // Handle error
    }
  }
  async addRecipeToPrivateList() {
    const { recipeName, recipeIngredients, recipeInstructions } = this;
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        // Handle error for user not logged in
        return;
      }

      const privateRecipeList = firebase.firestore().collection(`users/${user.uid}/privateRecipes`);
      const recipeRef = await privateRecipeList.add({
        name: recipeName,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
      });
      // Reset form fields
      this.recipeName = '';
      this.recipeIngredients = '';
      this.recipeInstructions = '';
    } catch (err) {
      console.dir(err);
      // Handle error
    }
  }
}