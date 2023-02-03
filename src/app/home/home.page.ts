import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Recipe } from '../models/recipe';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { PopoverController } from '@ionic/angular';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  publicRecipeList: Recipe[]=[];
  publicRecipeListSub: Recipe[]=[];
  serchTerm: string ='';
  auth = firebase.auth();
  db = firebase.firestore;


  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {
  
  }
 

 

  async addRecipe() {
    const popover = await this.popoverController.create({
      component: AddRecipeComponent,
      componentProps: { Recipe },
    });
    return await popover.present();
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.auth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['/signup']);
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}