import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { PopoverController } from '@ionic/angular';
import { RecipePopoverComponent } from '../recipe-popover/recipe-popover.component';
import firebaseApp from 'src/firebase';

const db = firebaseApp.firestore();

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  publicRecipeList: any[]= [];
  publicRecipeListSub: any;
  constructor(
    public popoverController: PopoverController,
  ) { }
  ngOnInit() {
    this.publicRecipeListSub = db.collection('publicRecipeList').onSnapshot((querySnapshot) => {
      this.publicRecipeList = [];
      querySnapshot.forEach((doc) => {
        this.publicRecipeList.push({ id: doc.id, ...doc.data() });
      });
    });
  }

  ngOnDestroy() {
    this.publicRecipeListSub();
  }

  async showDetails(recipe: any) {
    const popover = await this.popoverController.create({
      component: RecipePopoverComponent,
      componentProps: { recipe },
    });
    return await popover.present();
  }
}
