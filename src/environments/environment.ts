// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import * as firebase from "firebase/compat";

export const environment = {
  production: false,
    firebase: {
    apiKey: "AIzaSyA_QcSNRI_S-hXDOOpp_-C6Ascbr-6kA7c",
    authDomain: "myrecipelist-f6184.firebaseapp.com",
    projectId: "myrecipelist-f6184",
    storageBucket: "myrecipelist-f6184.appspot.com",
    messagingSenderId: "474965817230",
    appId: "1:474965817230:web:6f12cbed930c97f477d6df",
    measurementId: "G-9KD1R94KKB"
  }
};






/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
