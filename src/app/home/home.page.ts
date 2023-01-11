import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Home
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div *ngIf="user">
        <h1>Welcome, {{user.displayName}}!</h1>
        <ion-button (click)="goToRecipeList()">View Recipes</ion-button>
      </div>
      <div *ngIf="!user">
        <h1>Welcome to Recipe Book</h1>
        <p>Please login to view your recipes.</p>
        <ion-button (click)="goToLogin()">Login</ion-button>
      </div>
    </ion-content>
  `
})
export class HomePage implements OnInit {
  user: firebase.User;
  
  
  constructor(
    private auth: FirebaseAuth,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }
  

  goToRecipeList() {
    this.router.navigate(['/recipes']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}