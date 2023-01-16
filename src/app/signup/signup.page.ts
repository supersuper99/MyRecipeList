import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';

const auth = getAuth(firebaseApp)

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  error: string ='';

  validateForm!: FormGroup;
  buildForm: any;


  constructor(private router: Router, private fb: FormBuilder) {}

  OnInit(){
    this.buildForm()
  }
  signup(): void {
    if (this.validateForm.valid){
      //Do shit
    } else{
      this.validateForm.markAsDirty();
    }
  }

  

  // signUp(form) {
  //   const { username, email, password } = form.value;
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       if (auth.currentUser) {
  //       updateProfile(auth.currentUser, {
  //         displayName: username, photoURL:""
  //       } )
  //       .then(() => {
     
  //       })
  //       .catch((error) => {
  //         // An error occurred
  //         // ...
  //       });
       
  //       this.router.navigate(['/home']);
  // }})
  //     .catch((error) => {
  //       this.error = error.message;
  //     });
  // }
}
