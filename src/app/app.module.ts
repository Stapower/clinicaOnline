import { CaptchaValidationService } from './services/captcha-validation.service';
import { DataBaseConnectionService } from './services/database-connection.service';
import { GoogletranslateService } from './services/googletranslate/googletranslate.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import firebaseConfig from '../environments/environment';
import { AltaComponent } from './componentes/turnos/alta/alta.component';
import { HttpClientModule }    from '@angular/common/http';
import { ListadoComponent } from './componentes/turnos/listado/listado.component';
import { TurnoComponent } from './componentes/turnos/turno/turno.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {MatDatepickerModule} from '@angular/material/datepicker';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import{PdfMakeWrapper} from "pdfmake-wrapper";
import { SigninComponent } from './componentes/signin/signin.component';
import { UploadImageComponent } from './componentes/upload-image/upload-image.component';
import { ListaUsuarioComponent } from './componentes/usuario/lista-usuario/lista-usuario.component';
import { GraficoComponent } from './componentes/grafico/grafico.component';

import { MatButtonModule } from  
    '@angular/material/button'; 
import { MatButtonToggleModule } from  
    '@angular/material/button-toggle'; 
import { MatInputModule } from  
    '@angular/material/input'; 
import { MatFormFieldModule } from  
    '@angular/material/form-field'; 
import { MatNativeDateModule } from  
    '@angular/material/core';
import { CaptchaComponentComponent } from './componentes/captcha-component/captcha-component.component';
import { DirectivaDirective } from './directivas/directiva.directive';
import { DatePipePipe } from './pipes/date-pipe.pipe';
import { IsTurnoTakenDirective } from './directivas/isTurnoTaken/is-turno-taken.directive';
import { AnimarDirective } from './directivas/animar.directive'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { TranslatePipe } from './pipes/translate/translate.pipe';

PdfMakeWrapper.setFonts(pdfFonts);


//cliente//6LcaBKYZAAAAADVMh2H0co3Qlf2-s216cLUpKAtW
//sv//6LcaBKYZAAAAAGjFK2TIdkqv4YEj109D9Q27E275
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AltaComponent,
    ListadoComponent,
    TurnoComponent,
    MisTurnosComponent,
    UsuarioComponent,
    SigninComponent,
    UploadImageComponent,
    ListaUsuarioComponent,
    GraficoComponent,
    CaptchaComponentComponent,
    DirectivaDirective,
    DatePipePipe,
    IsTurnoTakenDirective,
    AnimarDirective,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    RecaptchaModule,  //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    BrowserAnimationsModule
   ],
  providers: [DataBaseConnectionService, LoginComponent, CaptchaValidationService, MatDatepickerModule, GoogletranslateService/*, TranslateHttpLoader*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
/*export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}*/
