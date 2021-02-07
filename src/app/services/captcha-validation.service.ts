import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaValidationService {

  constructor() { }

  static url = "https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}";


  validateCaptcha(token) {

    var url = "recaptcha/api/siteverify?secret=" + "6LcGsqwZAAAAAEGd0oHUUaD0HPLzBC7jRm7EiCE3" + "&response=" + token;
    if(token == null || token == undefined){
      throw new TypeError("Token invalido");
    }


    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();

    console.log(xhr.status);

    if(xhr.status > 200 && xhr.status > 202){
      throw new TypeError("Error en verificar el Captcha en google");
    }

    return true;
  }
}
