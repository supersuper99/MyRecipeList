import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  aboutMe: any;

  constructor(private firebaseService: FirebaseService, private modalCtrl: ModalController, private aboutMeModalComponent: AboutMeModalComponent, private router: Router) {}

  ngOnInit() {
    this.getAboutMe()
  }

  getAboutMe(){
    const user = this.auth.currentUser
    if(user){
       this.db.collection('/users').doc(user.uid).onSnapshot((snapshot) => {
      this.aboutMe = snapshot.data();
      console.log(this.aboutMe)
      console.log('fdsa')
    });
   
    }else{
    console.log('no user found')
    return
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

  goHome(){
    this.router.navigate(['/home']);
  }




}
