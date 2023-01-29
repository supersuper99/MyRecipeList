import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc } from 'firebase/firestore';
import { FirebaseService } from 'src/services/firebase.service';
import { AboutMeModalComponent } from '../about-me-modal/about-me-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  auth = firebase.auth();
  db = firebase.firestore();
  aboutMe: string ='';

  constructor(private firebaseService: FirebaseService, private modalCtrl: ModalController, private aboutMeModalComponent: AboutMeModalComponent) {}

  ngOnInit() {
    this.getAboutMe()
  }

  getAboutMe(){
    const user = this.auth.currentUser
    if(user){
    return this.db.collection('/users').doc(user.uid).onSnapshot(doc =>  {
      if (doc.exists) {
          this.aboutMe = doc.data()?.['aboutMe'];
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
}
  
  }

  
  
  signout(){
  }

  async aboutMeModal() {
    const modal = await this.modalCtrl.create({
      component: AboutMeModalComponent,
    });
    return await modal.present();
  }




}
