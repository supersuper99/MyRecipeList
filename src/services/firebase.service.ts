import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Review } from 'src/app/models/review';
import { from, map, Observable } from 'rxjs';
import { Firestore } from 'firebase/firestore';
import { User } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = firebase.auth();
  db = firebase.firestore();

  constructor() { }

  addRecipe(recipe: Recipe) {
    return this.db.collection('publicRecipesList').add(recipe);
  }

  getPublicRecipesList() {
    return this.db.collection('publicRecipesList').get();
  }



  addReview(recipeId: string, review: Review): Promise<void> {
    return this.db.doc(`publicRecipesList/${recipeId}`).update({
      reviews: firebase.firestore.FieldValue.arrayUnion(review)
    });
  }

  getAverageRating(recipeId: string) {
    return this.db.doc(`publicRecipesList/${recipeId}`).onSnapshot(doc => {
      if (doc.exists) {
        const recipe = doc.data() as Recipe;
        let ratingSum = 0;
        recipe.reviews.forEach((review) => {
          ratingSum += review.rating;
        });
        const averageRating = ratingSum / recipe.reviews.length;
        return averageRating;
      } else {
        return
      }
    });
  }

  getReviews(recipeId: string): Observable<Review[]> {
    return from(this.db.doc(`publicRecipesList/${recipeId}`).get()).pipe(
      map(doc => {
        if (doc.exists) {
          const recipe = doc.data() as Recipe;
          return recipe.reviews || [];
        } else {
          return [];
        }
      }),
    );
  }

  


}
