import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private firebaseService: FirebaseService, private modalCtrl: ModalController) {}

  ngOnInit() {

  }
  
  signout(){
  }

  async showDetails(recipe: any) {
    const modal = await this.modalCtrl.create({
      component: RecipePopoverComponent,
      componentProps: { recipe },
    });
    return await modal.present();
  }


  updateProfile(){
    const user = this.auth.currentUser;
    const aboutMe = '';
    
    if (user) {
      this.db.collection("users").doc(user.uid).update({
        aboutme: 
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
