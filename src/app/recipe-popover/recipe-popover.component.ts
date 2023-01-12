import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';

const db = firebaseApp.firestore();

@Component({
  template: `
    <ion-card>
      <ion-card-header>{{ recipe.name }}</ion-card-header>
      <ion-card-content>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Instructions: {{ recipe.instructions }}</p>
        <p>Submitted by: {{ recipe.addedBy }}</p>
        <ion-button (click)="addToPrivateList(recipe)" expand="block" color="primary">Add to My List</ion-button>
      </ion-card-content>
    </ion-card>
  `
})
export class RecipePopoverComponent {
  recipe: any;
  constructor() {}

  async addToPrivateList(recipe:any) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
         // Handle error for user not logged in
         return;
        }
        // add to user private recipe list
        const privateRecipeList = db.collection(`users/${user.uid}/privateRecipes`);
        const recipeRef = await privateRecipeList.add({
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          addedBy: recipe.addedBy
        });
      } catch (err) {
        console.dir(err);
        // Handle error
      }
    }
  }