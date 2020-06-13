import { Injectable, NgModule } from "@angular/core";

import * as firebase from 'firebase/app';
import { HttpClientModule } from '@angular/common/http'; 


//import { FirebaseService } from './firebase.service';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';




import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';


//import firebaseConfig from '../../environments/environment';
//import { auth } from 'firebase/app';

//import { AngularFireAuth } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})

export class FirebaseAuth {
	//firebase = require('firebase');

  constructor( 	public afAuth: AngularFireAuth,
				//public afDatabase: AngularFireDatabase
		//private firebaseService: FirebaseService,
		//public afAuth: AngularFireAuth
	){}


	async login(user){
		try{
			console.log(user.email, user.password);
			const res = await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(i => console.log("USEEERR" , i.user.email));
			console.log("ERROR");
			//await this.findUser(user.email);	

		}
		catch(err){
			console.dir(err);
			throw err;
		}
	}

	async signIn(user){
		try{
			const res = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
		}
		catch(err){
			console.dir(err);
		}
	}

  /*doRegister(value){
	return new Promise<any>((resolve, reject) => {
		firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
		.then(res => {
		  resolve(res);
		}, err => reject(err))
	})
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }*/

	/*doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        reject();
      });
    })
  }*/
}