import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { RecipePopoverComponent } from '../recipe-popover/recipe-popover.component';
import firebaseApp from 'src/firebase';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import { Review } from '../models/review';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = []

  searchTerm: string = '';
  db = firebase.firestore();
  auth = firebase.auth()

  constructor(public popoverController: PopoverController, private router: Router, private firebaseService: FirebaseService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.listing();
  }

  listing() {
    this.firebaseService.getPublicRecipesList()
      .then(querySnapshot => {
        this.recipes = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Recipe;
        });
        console.log(this.recipes)
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAverageRating(reviews: Review[]) {
    return reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
  }




  goToProfile() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }



  async showDetails(recipe: any) {
    const popover = await this.modalCtrl.create({
      component: RecipePopoverComponent,
      componentProps: { recipe },
    });
    return await popover.present();
  }
}
