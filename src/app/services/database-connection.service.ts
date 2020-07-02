import { Doctor } from './../clases/doctor';
import { element } from 'protractor';
import { Paciente } from './../clases/paciente';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import firebaseConfig from '../../environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
	providedIn: 'root'
})
export class DataBaseConnectionService {

	constructor(public afAuth: AngularFireAuth, private http: HttpClient,
		public afs: AngularFirestore,
		public afDatabase: AngularFireDatabase
		//private firebaseService: FirebaseService,
		//public afAuth: AngularFireAuth
	) { }

	Todo: {
		id: String;
		description: String;
		completed: Boolean;
	};

	static peliculas = "/peliculas";
	static actores = "/actores";
	static users = "/users";
	
	static turno = "/turno";
	static especialidades = "/especialidades";

	basePicturesPath = "pictures/";

	static actoresYPeliculas = "/actoresYPeliculas";
	static url = "https://restcountries.eu/rest/v2/region/americas";

	static paises = new Array();
	static loggedUser = new Paciente();

	getlist(url, returnObject) {

		var serviceReturn = this.http.get(url).subscribe(data => {
			// Read the result field from the JSON response.get response
			for (let i = 0; ; i++) {

				if (data[i] != null) {
					returnObject.push(data[i]);
					DataBaseConnectionService.paises.push(data[i])
				} else {
					break;
				}

			}
			console.log(data[0].name);
			returnObject.data;
		});

	}


	eliminarPais(pais) {
		console.log(pais.name);
		DataBaseConnectionService.paises = DataBaseConnectionService.paises.filter(f => { return f.name != pais.name });
		console.log(DataBaseConnectionService.paises[0].name);
		return DataBaseConnectionService.paises;
	}


	bringEntity(path, returnObject) {
		console.log("bringEntity");
		//var returnObject = new Array(); 


		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			console.log("before snapshto foreach");
			returnObject.length = 0;
			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc.id, " => ", postData);
				postData.id = doc.payload.doc.id;
				returnObject.push(postData);
			})
			console.log("after snapshto foreach");

			//returnObject = array;
			console.log(returnObject);
			return returnObject;
		});

		/*await imageRef.get().then(function (querySnapshot) {
			console.log("querySnapshot", querySnapshot);
			console.log("path" + path);

			querySnapshot.forEach(function (doc) {
				var postData = doc.data();
				console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				array.push(postData);

			});
		});
		*/
	}


	
	async bringEntityWithEventEmmiter(path, returnObject) {
		console.log("bringEntity");
		//var returnObject = new Array(); 


		var imageRef = await this.afs.collection<any>(path);

		await imageRef.get().forEach(snapshot => {
			var array = new Array();
			console.log("before snapshto foreach");
			returnObject.length = 0;

			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.data();
				console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				//returnObject.next(postData);
				returnObject.push(postData);
			})
			console.log("after snapshto foreach");

			//returnObject = array;
			console.log(returnObject);
			//return returnObject;
		});

		return returnObject;
	}

	bringEntityWithFilterDocument(path, returnObject, filterDocument){
		console.log("bringEntityWithFilter");

		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			console.log("before snapshto foreach");
			returnObject.length = 0;
			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc.id, " => ", postData);
				postData.id = doc.payload.doc.id;

				if(postData.documento == filterDocument && !this.isDatefifteenDaysInFuture(postData.fecha))
					returnObject.push(postData);
			})
			console.log("after snapshto foreach");

			console.log(returnObject);
			return returnObject;
		});
	}

	isDatefifteenDaysInFuture(date1){
		let dateString = date1 + 'T00:00:00';
		let newDate = new Date(dateString);
		newDate.getTime();

		var nowDate = new Date();
		nowDate.getTime();

		if(nowDate.getTime() > newDate.getTime()){
			return false;
		}
		if(nowDate.getTime() == newDate.getTime()){
			return false;
		}
		if(nowDate.getTime() > newDate.getTime()){
			var diffTime = nowDate.getTime() - newDate.getTime();
			var day_as_milliseconds = 86400000;
			
			var diff_in_days = diffTime / day_as_milliseconds;

			if(diff_in_days > 15){
				return true;
			}
			else{
				return false;
			}
			
		}

	}

	bringEntityWithAssignment(path, returnObject, filterDocument){
		console.log("bringEntityWithFilter");

		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			console.log("before snapshto foreach");
			returnObject.length = 0;
			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc.id, " => ", postData);
				postData.id = doc.payload.doc.id;

				console.log("postData.asignado.documento", postData.asignado != null ? postData.asignado.documento : postData.asignado);
				
				if(postData.asignado != null && postData.asignado.documento === filterDocument && !this.isDatefifteenDaysInFuture(postData.fecha)){
					console.log("Asignado Found");
					
					returnObject.push(postData);
				}
			})
			console.log("after snapshto foreach");

			console.log("Filtered List", returnObject);
			return returnObject;
		});
	}


	async deleteEntity(path, id) {
		console.log("bringEntity");
		var array = new Array();

		var imageRef = await this.afs.collection(path).ref;
		await imageRef.doc("/" + id).delete().then(succ => { console.log("deletion completed"); });

		/*await imageRef.get().then(function (querySnapshot) {
			console.log("querySnapshot", querySnapshot);
			console.log("path" + path);

			querySnapshot.forEach(function (doc) {
				var postData = doc.data();
				console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				array.push(postData);

			});
		});

		return array;*/
	}


	async saveEntity(path, newObject, returnId) {
		await this.afs.collection(path).add(newObject).then(
			(res) => {
				console.log("saveEntity", res);
				returnId = res.id;
			}
		);
	}

	async saveExistingEntity(path, newObject, id) {
		console.log("saveExistingEntity");
		var imageRef = await this.afs.collection(path).ref;
		await imageRef.doc("/" + id).set(newObject).then(succ => { console.log("update completed"); });
	}



	//{"peliculaId" : this.pelicula.id}
	async bringUserByEmail(path, email, finaluser, finalUserStatic) {
		console.log("bringEntity with email", email);
		/*var imageRef2 = this.afs.collection<any>(path).get(keyValueJson).forEach(record => {
			console.log("record", record);

			record.docs.forEach(doc=> {
								console.log("doc", doc);
								returnObject = doc.data();
							})
			});*/

		var imageRef = await this.afs.collection<any>(path);

		await imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			console.log("before snapshot foreach");
			
			var postData = snapshot.forEach(doc => {
				var postData = doc.payload.doc.data();
				postData.id = doc.payload.doc.id;
				//console.log("postData", postData);
				
				if (postData.email == email) {
					finaluser.length = 0;
					finaluser.push(postData);

					finalUserStatic.length = 0;
					finalUserStatic.push(postData);

					/*sessionStorage.setItem('cliente', postData.nombre);
					sessionStorage.setItem('documento', postData.documento);
					sessionStorage.setItem('foto', postData.foto);
					sessionStorage.setItem('rol', postData.rol);
					sessionStorage.setItem('especialidad', postData.especialidad);
					sessionStorage.setItem('horarioDesde', postData.horarioDesde);
					sessionStorage.setItem('horarioHasta', postData.horarioHasta);*/
				}
				console.log("postData", postData);
				console.log("finalUser", finaluser);


			})
			
			console.log("after snapshto foreach");
			//localStorage.setItem('cliente', finaluser[0);

			//returnObject = array;
			console.log(finaluser);
			return finaluser;
		}).catch(err => {console.log("ERROR", err);});

		/*imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			console.log("before snapshto foreach");
			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc.id, " => ", postData);
				postData.id = doc.payload.doc.id;
				returnObject.push(postData);
			})
			console.log("after snapshto foreach");

			//returnObject = array;
			console.log(returnObject);
			return returnObject;
		});*/
	}


	async saveConnectedDate(path, email) {
		console.log("bringEntity with email", email);
		/*var imageRef2 = this.afs.collection<any>(path).get(keyValueJson).forEach(record => {
			console.log("record", record);

			record.docs.forEach(doc=> {
								console.log("doc", doc);
								returnObject = doc.data();
							})
			});*/

		var imageRef = await this.afs.collection<any>(path);

		var subscription = await imageRef.snapshotChanges().subscribe(snapshot => {
			var array = new Array();
			console.log("before snapshot foreach", snapshot);
			
			var postDataFinal = snapshot.forEach(doc => {
				console.log("docforEach", doc);

				var postData = doc.payload.doc.data();
				postData.id = doc.payload.doc.id;
				//console.log("postData", postData);
				console.log("saveConnectedDate postData", postData);

				if (postData.email == email) {

					var d = new Date().toDateString();
					postData.lastConnection = d;

					console.log("Before saving  time", postData().lastConnection);
					subscription.unsubscribe();
					imageRef.doc("/" + doc.payload.doc.id).set(postData);
					console.log("Saved time", postData().lastConnection);

				}

				console.log("Final saveConnectedDate postData", postData);
			});

		} );
	}




	async login(user, finalUser){
		try{
			console.log(user.email, user.password);
			const res = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
			//await this.finduser(user.email, finalUser);
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
			throw err;
		}
	}

	async finduser(email, finaluser, finalUserStatic){
		await this.bringUserByEmail(DataBaseConnectionService.users, email, finaluser, finalUserStatic);
		//localStorage.setItem('cliente',  user2);
		console.log(finaluser);
	}

	async addImage(value, relativePath) {
		console.log("value", value);
		const selfieRef = firebase.storage().ref(this.basePicturesPath + relativePath);
		await selfieRef.put(value);
			//, 'base64', { contentType: 'image/png' });

		var download = "";

		await selfieRef.getDownloadURL().then(succ => {
			download = succ;
		});

		return download;
	}

	/*
		const selfieRef = firebase.storage().ref(this.basePicturesPath + relativePath);
		await selfieRef.putString(value, 'base64', { contentType: 'image/png' });

		var download = "";

		await selfieRef.getDownloadURL().then(succ => {
			download = succ;
		});
	*/

	bringEntityWithFilterString(path, turnos, filterWord, isProfesional, filterDocument){
		console.log("bringEntityWithFilterString");

		var imageRef = this.afs.collection<any>(path);

		imageRef.get().forEach((snapshot => {
		//imageRef.snapshotChanges().forEach(snapshot => {
			console.log("before snapshto foreach");
			turnos.length = 0;
			var postData = snapshot.forEach(doc => {
				console.log("inside snapshto foreach");

				var postData = doc.data();
				console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				
				var jsonString = JSON.stringify(postData);
				
				if(isProfesional && 
					(postData.asignado != null 
						&& postData.asignado.documento === filterDocument)){

						if(jsonString.includes(filterWord))
							turnos.push(postData);
						else if(filterWord == null || filterWord == undefined)
							turnos.push(postData);
				}
				else if(postData.documento == filterDocument){
					if(jsonString.includes(filterWord))
						turnos.push(postData);
					else if(filterWord == null || filterWord == undefined)
						turnos.push(postData);
				}
			})
			console.log("after snapshto foreach");
			console.log(turnos);
			return turnos;
		}));
	}


}
