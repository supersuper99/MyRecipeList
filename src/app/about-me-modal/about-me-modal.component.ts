import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-about-me-modal',
  templateUrl: './about-me-modal.component.html',
  styleUrls: ['./about-me-modal.component.scss'],
})
export class AboutMeModalComponent implements OnInit {
  auth = firebase.auth();
  db = firebase.firestore();
  validateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm(): void {
    this.validateForm = this.formBuilder.group({
      aboutMe: ['', Validators.required],
    });
  }

  updateProfile(){
    const user = this.auth.currentUser;
    const aboutMe = '';
    
    if (user) {
      this.db.collection("users").doc(user.uid).update({
        aboutme: this.user.displayName 
      }).then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

  }}
}