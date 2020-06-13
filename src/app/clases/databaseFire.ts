import { Injectable, NgModule } from "@angular/core";

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { HttpClientModule } from '@angular/common/http';


//import { FirebaseService } from './firebase.service';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';



import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import firebaseConfig from '../../environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

//import {AngularFirestore} from 'angularfire2/firestore';
//import { auth } from 'firebase/app';

//import { AngularFireAuth } from '@angular/fire/auth';


/*@NgModule({
	imports: [	AngularFireModule.initializeApp(firebaseConfig.firebase),
				AngularFireAuthModule
			],
	providers: [ AngularFireAuth]
})*/

@Injectable({
	providedIn: 'root'
})

export class DatabaseFire {
	//firebase = require('firebase');

	constructor(public afAuth: AngularFireAuth,
		public afs: AngularFirestore,
		public afDatabase: AngularFireDatabase
		//private firebaseService: FirebaseService,
		//public afAuth: AngularFireAuth
	) { }

	basePicturesPath = "pictures/";
	cosasLindasPath = "cosasLindas";
	cosasFeasPath = "cosasLindas";



	addPoints(game, user, points) {
		return new Promise<any>((resolve, reject) => {
			this.afs.collection("/juegos").add({
				usuario: user,
				points: points,
				juego: game
			})
				.then(
					(res) => {
						resolve(res)
					},
					err => reject(err)
				)
		})
	}
	

	getListado(listado){

		var imageRef = this.afs.collection<any>("/juegos");

		imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			console.log("before snapshto foreach");
			listado.length = 0;
			var postData = snapshot.forEach(doc => {
				var postData = doc.payload.doc.data();
				console.log("postData", postData);
				listado.push(postData);
			})
			console.log("after snapshto foreach");

			//returnObject = array;
			console.log(listado);
			return listado;
		});
	}


	async login(user) {
		try {
			const res = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
		}
		catch (err) {
			console.dir(err);
		}
	}

	async signIn(user) {
		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
		}
		catch (err) {
			console.dir(err);
		}
	}

	async insertPic(pic: String) {

	}

	addUser(value) {
		return new Promise<any>((resolve, reject) => {
			this.afs.collection('/users').add({
				name: value.name,
				surname: value.surname,
				age: parseInt(value.age)
			})
				.then(
					(res) => {
						resolve(res)
					},
					err => reject(err)
				)
		})
	}

	async addImage(value, type, user, relativePath) {

		const selfieRef = firebase.storage().ref(this.basePicturesPath + relativePath);
		await selfieRef.putString(value, 'base64', { contentType: 'image/png' });

		var download = "";

		await selfieRef.getDownloadURL().then(succ => {
			download = succ;
		});


		console.log("download", download);

		var postData = {
			type: type,
			image: download,
			user: user,
			votos: new Array()//,
			//date: firebase.database.ServerValue.TIMESTAMP
		};

		console.log("postData", postData);

		this.afs.collection('/image').add({
			postData
		}).then(succ => {
			console.log("Update on database succeded")
		}).catch(err => {
			throw err;
		});
	}

	updateImagesRef(returnObject, snapshot) {

	}

	async getImages(returnObject) {

		console.log("getImages");
		var array = new Array(); 

		var imageRef = await this.afs.collection('/image').ref;

		await imageRef.get().then(function (querySnapshot) {
			console.log("querySnapshot", querySnapshot);

			querySnapshot.forEach(function (doc) {
				var postData = doc.data().postData;
				console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				array.push(postData);

			});

			returnObject = array;
			console.log("returnObject" , returnObject);
		});
	
		console.log("leaveGetImages");

		return returnObject;
		

	}

	votar(foto, user){
		foto.voto.push(user);
		
		var imageRef = this.afs.collection('/image').doc("/"+foto.id).update(foto);
		/*const d = this.afDatabase.list('/image');
		d.update(foto.id, foto);*/

	}

}