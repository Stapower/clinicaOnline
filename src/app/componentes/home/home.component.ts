import { Paciente } from './../../clases/paciente';
import { DataBaseConnectionService } from './../../services/database-connection.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(		private router: Router, private login : LoginComponent, private databaseConnection: DataBaseConnectionService
    ) { }


  loggedUser = [];
//  localStorage.setItem('usuario', this.user.email);

  ngOnInit(): void {
  }
  user = {
		email: "cliente1@utn.com",
		password: "123456"
  };

  Mensajes: string;

  
  redirectTo(path : String){
    this.router.navigate(["Home/"+path]);
  }

  Entrar(){
    console.log(this.loggedUser);
    console.log('entro', this.user);
    
    this.databaseConnection.login(this.user, this.loggedUser).then(res => {
      console.log("Success", res);
      //this.router.navigate(['/Home']);
      //localStorage.setItem('cliente', this.loggedUser[0].nombre);
    })
    .catch(err => {
      this.MostarMensaje(err.message);
      console.log("Failed", err.message);
    });
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
		this.Mensajes = mensaje;
		var x = document.getElementById("snackbar");
		if (ganador) {
			x.className = "show Ganador";
		} else {
			x.className = "show Perdedor";
		}
		var modelo = this;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		console.info("objeto", x);
	}

}
