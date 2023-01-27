import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  auth = firebase.auth();
  db = firebase.firestore();

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {

  }
  
  signout(){
  }

  updateProfile(){
    const user = this.auth.currentUser;
    const aboutMe = '';
    
    if (user) {
      this.db.collection("users").doc(user.uid).update({
        aboutme: this.user.aboutMe
      }).then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
      
      
    }
  }


}
