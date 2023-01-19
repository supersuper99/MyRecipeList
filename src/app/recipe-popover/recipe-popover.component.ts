import { Component, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';
import { Recipe } from '../models/recipe';

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp)

@Component({
  template: `
    <ion-card>
      <ion-card-header>{{ recipe.name }}</ion-card-header>
      <ion-card-content>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Instructions: {{ recipe.instructions }}</p>
        <p>Submitted by: {{ recipe.userId }}</p>
        <ion-button (click)="addToPrivateList(recipe)" expand="block" color="primary">Add to My List</ion-button>
      </ion-card-content>
    </ion-card>
  `
})
export class RecipePopoverComponent {
  @Input()
  recipe!: Recipe;
  db = firebase.firestore();
auth = firebase.auth;

  constructor() {}

  async addToPrivateList(recipe:any) {
    try {
      const user = auth.currentUser;
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
          addedBy: recipe.userId
        });
      } catch (err) {
        console.dir(err);
        // Handle error
      }
    }
  }