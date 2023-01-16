import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseApp from 'src/firebase';


const auth = getAuth(firebaseApp);


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  error: string = '';
  validateForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(){
    this.buildForm();
  }

  buildForm(): void {
    this.validateForm = this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]]
    });
  }

  login(): void {
    if (this.validateForm.valid){
      //Do shit
    } else{
      this.validateForm.markAsDirty();
    }
  }

  forgotPassword(){

  }




  // login() {

  //   const { email, password } = this.form.value;
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       this.router.navigate(['/home']);
  //     })
  //     .catch((error: any) => {
  //       this.error = error.message;
  //     });
  // }
}