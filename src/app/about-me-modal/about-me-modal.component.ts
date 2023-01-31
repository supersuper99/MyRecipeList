import { Component, Injectable, OnInit } from '@angular/core';
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

@Injectable({
  providedIn: 'root' // just before your class
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
      aboutme: ['', Validators.required],
    });
  }

  updateProfile(){
    if (this.validateForm.valid) {
    const user = this.auth.currentUser;
    if (user) {
      this.db.collection("users").doc(user.uid).update({
        aboutme: this.validateForm.value.aboutme 
      }).then(() => {
        
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

  }}}
}
