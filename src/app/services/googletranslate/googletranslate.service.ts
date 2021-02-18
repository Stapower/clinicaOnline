//import { GoogleObj } from './googletranslate.service';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//const {Translate2} = require('@google-cloud/translate').v2;

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {


  
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';



  constructor(private http: HttpClient) { 
  }

  translate(obj : GoogleObj) {
    return this.http.post(this.url + this.key, obj);//+ "?q=" + q + "?target=" + target + "?source=" + source);
  }

url = "https://translation.googleapis.com/language/translate/v2?key=";
//key = "420773658623-e77hom9n220he49ib63ngrqcgpav4h3e.apps.googleusercontent.com";
key="tpclinicaonline@appspot.gserviceaccount.com";
//key = "f0k7gdYujwRFwzv0gjHRj4Nk";



}

export interface GoogleObj {

  q: [ String ];//string;
  target: string;
  source: string;
  format :string;
  model : string;
}


