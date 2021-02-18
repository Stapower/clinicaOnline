import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha-component',
  templateUrl: './captcha-component.component.html',
  styleUrls: ['./captcha-component.component.css']
})
export class CaptchaComponentComponent implements OnInit {
  @Input() usuario;
  @Input() leng;

  @Output() captchaResult = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit (){
    console.log("ngAfterViewChecked");

    this.isCaptchaValid = false;
    this.captchaResult.emit(this.isCaptchaValid);
  }



  
isCaptchaValid = false;
captchaCode = "";
userCaptchaInput= "";
captcha(){
 var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
   'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
	 '0','1','2','3','4','5','6','7','8','9');
 var i;
 for (i=0;i<6;i++){
   var u = alpha[Math.floor(Math.random() * alpha.length)];
   var t = alpha[Math.floor(Math.random() * alpha.length)];
   var n = alpha[Math.floor(Math.random() * alpha.length)];
   var f = alpha[Math.floor(Math.random() * alpha.length)];
   var r = alpha[Math.floor(Math.random() * alpha.length)];
   var a = alpha[Math.floor(Math.random() * alpha.length)];
   
		  }
   var code = u + ' ' + t + ' ' + ' ' + n + ' ' + f + ' ' + r + ' '+ a;
   console.log("CAPTCHA CODE - ", code);
   this.captchaCode = code;
   //document.getElementById("mainCaptcha").innerHTML = code;

   }

validCaptcha(){
 var string1 = this.removeSpaces(this.userCaptchaInput);
 var string2 =this.removeSpaces(this.captchaCode);

  if(string2 == ""){
    this.captcha();
    return;
  }

 if (string1 == string2){
	 this.isCaptchaValid = true;
 }else{        
   this.isCaptchaValid = false;
   this.captcha();
  }
  
  this.captchaResult.emit(this.isCaptchaValid);
}


removeSpaces(string){
 return string.split(' ').join('');
}

deactivateCaptcha(){
  this.isCaptchaValid = true;
  this.captchaResult.emit(this.isCaptchaValid);

}



}
