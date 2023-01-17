import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { PopoverController } from '@ionic/angular';
import { RecipePopoverComponent } from '../recipe-popover/recipe-popover.component';
import firebaseApp from 'src/firebase';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  publicRecipeList: Recipe[]= [];
  filteredRecipes: Recipe[]= [];
  searchTerm: string = '';
  db = firebase.firestore();
  auth = firebase.auth()

  constructor(public popoverController: PopoverController,private router: Router) { }

  ngOnInit() {
    // Get the public recipe list from Firestore
    firebase.firestore().collection('recipes').onSnapshot((querySnapshot) => {
      this.publicRecipeList = [];
      querySnapshot.forEach((doc) => {
        this.publicRecipeList.push({
          id: doc.id, ...doc.data(),
          name: '',
          ingredients: [],
          instructions: '',
          userId: '',
          createdAt: new Date,
        });
      });
      this.filteredRecipes = this.publicRecipeList;
    });
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
    const popover = await this.popoverController.create({
      component: RecipePopoverComponent,
      componentProps: { recipe },
    });
    return await popover.present();
  }
}
