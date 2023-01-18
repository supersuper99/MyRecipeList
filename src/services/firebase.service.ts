import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    auth = firebase.auth();
    db = firebase.firestore();

  constructor() {}

  addRecipe(recipe: Recipe) {
    return this.db.collection('publicRecipesList').add(recipe);
  }

  getPublicRecipesList() {
    return this.db.collection('publicRecipesList').get();
  }
}