import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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

  constructor(private firebaseService: FirebaseService, private modalCtrl: ModalController, private aboutMeModalComponent: AboutMeModalComponent) {}

  ngOnInit() {

  }
  
  signout(){
  }

  async showDetails() {
    const modal = await this.modalCtrl.create({
      component: AboutMeModalComponent,
    });
    return await modal.present();
  }




}
