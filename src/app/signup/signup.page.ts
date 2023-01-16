import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';

const auth = firebase.auth();
const db = firebase.firestore().collection('users')

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  error: string ='';

  validateForm!: FormGroup;



  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(){
    this.buildForm();
  }

  buildForm(): void {
    this.validateForm = this.fb.group({
      username:[null,[Validators.maxLength(10)]],
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]]
    });
  }

  signup(): void {
    if (this.validateForm.valid){
      const email = this.validateForm.controls['email'].value;
      const password = this.validateForm.controls['password'].value;
      const username = this.validateForm.controls['username'].value;

      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user
          userCredential.user?.updateProfile({
            displayName: username
          });
          if (user) {
          db.doc(user.uid).set({
            username: username,
            email: email
          });
        }
          this.router.navigate(['/home']);
        })
    } else{
      this.validateForm.markAsDirty();
    }
  }

  forgotPassword(){}

  

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
