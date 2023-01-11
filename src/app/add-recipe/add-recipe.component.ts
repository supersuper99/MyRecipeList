import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
      const user = firebase.auth().currentUser;
      if (!user) {
        // Handle error for user not logged in
        return;
      }

      const publicRecipeList = firebase.firestore().collection('publicRecipeList');
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
}