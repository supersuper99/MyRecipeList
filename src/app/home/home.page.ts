import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';
import { getAuth } from "firebase/auth";
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

const auth = getAuth(firebaseApp);
const db = firebaseApp.firestore();



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  publicRecipeList: any[]=[];
  publicRecipeListSub: any;
  filteredRecipes: any[]=[];
  constructor(private router: Router) { }

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

  search(event:any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRecipes = this.publicRecipeList.filter((recipe) => recipe.name.toLowerCase().indexOf(searchTerm) > -1);
  }

  logOut() {
    auth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}