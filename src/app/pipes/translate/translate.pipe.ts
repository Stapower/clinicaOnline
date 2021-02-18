import { Pipe, PipeTransform } from '@angular/core';

 
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {



transform(value) {
  
  var arra = value.split('@');
  var stringText = arra[0];
  var lenguage : string = arra[1];
  lenguage = lenguage.toUpperCase();
  //lenguage = lenguage.trim();

  var stringTextUpper = stringText.toUpperCase();
  //stringText = stringText.trim();

  
  console.log("TRANSLATE", stringText + lenguage);
  console.log("TRANSLATETO", lenguage);


  var r = stringText;
  if(lenguage == "IT"){
    stringTextUpper = this.italian(stringTextUpper);
  }
  else if(lenguage == "FR"){
    stringTextUpper = this.french(stringTextUpper);
  }
  else if(lenguage == "EN"){
    stringTextUpper = this.english(stringTextUpper);
  }
  else if(lenguage == "BR"){
    stringTextUpper = this.portugues(stringTextUpper);
  }
  else{
    stringTextUpper = this.spanish(stringTextUpper);
  }

  console.log("TRANSLATE2", r);
  if(stringTextUpper == undefined)
    return r;
  else
    return stringTextUpper;

}

italian(value){
  switch(value){
    case "HOME":
      return "Casa";
    case "ALTA TURNO":
      return "High Shift";
    case "MIS TURNOS":
      return "I miei turni";
    case "LOG OUT":
      return "Disconnettersi";
    case "BIENVENIDO":
      return "Benvenuto";
    case "MODIFICAR USUARIO":
      return "Modifica utente";
    case "APELLIDO":
      return "cognome";
    case "NOMBRE":
      return "Nome";
    case "DOCUMENTO":
      return "documenti";
    case "EMAIL":
      return "posta elettronica";
    case "GUARDAR":
      return "SALVA";
    case "FECHA":
      return "Data";
    case "NOMBRE DEL MEDICO":
     return "Nome del medico";
    case "DOCUMENTO":
      return "documenti";
    case "FOTO":
      return "foto";
    case "ESTADO":
      return "Condizione";
    case "IR A DETALLES":
      return "Vai ai dettagli";
    case "ESPECIALIDAD":
      return "Specialità";
    case "SELECCIONAR":
      return "Selezionare";
    case "MODIFICAR USUARIO":
      return "Modifica utente";
    case "APELLIDO":
      return "cognome";
    case "NOMBRE":
      return "Nome";
    case "MEDICINA GENERAL":
      return "Medicina generale";
    case "OFTALMOLOGIA":
      return "Oftalmologia";
    case "CANCELADO":
      return "Annullato";
    case "ACEPTADO":
      return "Accettato";
    case "FINALIZADO":
      return "Finalizzato";

    case "PACIENTE":
      return "Paziente";
    case "NOMBRE DEL PACIENTE":
      return "Nome del paziente";
    case "DESCRIPCION":
      return "DESCRIZIONE";
    case "ESPECIALISTA":
      return "SPECIALISTA";
    case "SIGUIENTE SEMANA":
      return "LA PROSSIMA SETTIMANA";
    case "REFRESH CAPTCHA":
      return "AGGIORNA CAPTCHA";
    case "CHECK":
      return "DAI UN'OCCHIATA.";
    case "JUEVES":
      return "Giovedi";
    case "DE":
      return "di";
    case "ENERO":
      return "Gennaio";
    case "FEBRERO":
      return "febbraio";
    case "MARZO":
      return "marzo";
    case "ABRIL":
      return "aprile";
    case "MAYO":
      return "maggio";
    case "JUNIO":
      return "giugno";
    case "JULIO":
      return "luglio";
    case "AGOSTO":
      return "agosto";
    case "SEPTIEMBRE":
      return "settembre";
    case "OCTUBRE":
      return "ottobre";    
    case "NOVIEMBRE":
      return "novembre";   
    case "DICIEMBRE":
      return "dicembre";    
    case "LUNES":
      return "LUNEDI";          
    case "MARTES":
      return "MARTEDÌ";    
    case "MIERCOLES":
      return "MERCOLEDÌ";    
    case "VIERNES":
      return "VENERDÌ";  
    case "TURNO PARA EL DIA":
      return "Cambia per la giornata"; 
    case "DOCTOR":
      return "Medico"; 
    case "ALTA DE TURNO":
      return "Registrazione del turno"; 
    case "ALTA":
      return "haute"; 
    case "SOY PACIENTE":
      return "sono paziente"; 
    case "ES MEDICO?":
      return "È un dottore?";
    case "CONFIRMACION":
      return "Conferma";
    case "ES MEDICO":
      return "È un medico";
    case "ES PACIENTE":
      return "è un paziente";
    case "DOWNLOAD":
      return "Download"; 
    case "ADMIN":
      return "amministratore";
    case "PROFESIONAL":
      return "professionale";
    case "ROL":
      return "Occupazione";
  }
  //return value;

}

french(value){
  switch(value){
    case "HOME":
      return "Maison";
    case "ALTA TURNO":
      return "Virage Haut";
    case "MIS TURNOS":
      return "Mes Changements";
    case "LOG OUT":
      return "SE DÉCONNECTER";
    case "BIENVENIDO":
      return "BIENVENUE";
    case "MODIFICAR USUARIO":
      return "Modifier l'utilisateur";
    case "APELLIDO":
      return "LE NOM";
    case "NOMBRE":
      return "NOM";
    case "DOCUMENTO":
      return "DOCUMENT";
    case "EMAIL":
      return "e-mail";
    case "GUARDAR":
      return "SAUVEGARDER";
    case "FECHA":
      return "Date";
    case "NOMBRE DEL MEDICO":
     return "Nom Du Médecin";
    case "FOTO":
      return "Photo";
    case "ESTADO":
      return "état";
    case "IR A DETALLES":
      return "Aller Aux Déetails";
    case "ESPECIALIDAD":
      return "Spécialité";
    case "SELECCIONAR":
      return "Pour Sélectionner";
    case "MEDICINA GENERAL":
      return "Médecine générale";
    case "OFTALMOLOGIA":
      return "Ophtalmologie";
    case "CANCELADO":
      return "Annulé";
    case "ACEPTADO":
      return "Accepté";
    case "FINALIZADO":
      return "c'est fini";
    case "PACIENTE":
      return "Patiente";
    case "NOMBRE DEL PACIENTE":
      return "Le nom du patient";
    case "DESCRIPCION":
      return "Description";
    case "ESPECIALISTA":
      return "Spécialiste";
    case "SIGUIENTE SEMANA":
      return "La semaine prochaine";
    case "REFRESH CAPTCHA":
      return "RAFRAÎCHIR CAPTCHA";
    case "CHECK":
      return "CHÈQUE";
    case "JUEVES":
      return "jeudi";
    case "DE":
      return "de";
    case "ENERO":
      return "janvier";
    case "FEBRERO":
      return "février";
    case "MARZO":
      return "mars";
    case "ABRIL":
      return "avril";
    case "MAYO":
      return "Peut";
    case "JUNIO":
      return "June";
    case "juin":
      return "juillet";
    case "Agosto":
      return "août";
    case "SEPTIEMBRE":
      return "septembre";
    case "OCTUBRE":
      return "octobre";    
    case "NOVIEMBRE":
      return "novembre";   
    case "DICIEMBRE":
      return "Décembre";    
    case "LUNES":
      return "Lundi";          
    case "MARTES":
      return "mardi";    
    case "MIERCOLES":
      return "Mercredi";    
    case "VIERNES":
      return "vendredi";  
    case "TURNO PARA EL DIA":
      return "Rendez-vous pour la journée"; 
    case "DOCTOR":
      return "docteur"; 
    case "ALTA DE TURNO":
      return "Créer un rendez-vous"; 
    case "ALTA":
      return "haut";
    case "SOY PACIENTE":
      return "je suis patient";
    case "ES MEDICO?":
      return "Est-il médecin?";
    case "CONFIRMACION":
      return "Confirmation";
    case "ES MEDICO":
      return "Est un médecin";
    case "ES PACIENTE":
      return "est un patient";
    case "DOWNLOAD":
      return "Télécharger";  
    case "ADMIN":
      return "administrateur"; 
    case "ROL":
      return "rôle"; 
    case "PROFESIONAL":
      return "professionnel";
    }

      


  
}

english(value){
  switch(value){
    case "HOME":
      return "Home";
    case "ALTA":
      return "Create";
    case "ALTA TURNO":
      return "Create appointment";
    case "MIS TURNOS":
      return "My Appointments";
    case "LOG OUT":
      return "Log Out";
    case "BIENVENIDO":
      return "Welcome";
    case "MODIFICAR USUARIO":
      return "Modify User";
    case "APELLIDO":
      return "Surname";
    case "NOMBRE":
      return "Name";
    case "DOCUMENTO":
      return "ID";
    case "EMAIL":
      return "e-mail";
    case "GUARDAR":
      return "Save";
    case "FECHA":
      return "Date";
    case "NOMBRE DEL MEDICO":
     return "Doctor's name";
    case "FOTO":
      return "Picture";
    case "ESTADO":
      return "State";
    case "IR A DETALLES":
      return "Go to details";
    case "ESPECIALIDAD":
      return "Speciality";
    case "SELECCIONAR":
      return "Select";
    case "MODIFICAR USUARIO":
      return "Modify User";
    case "MEDICINA GENERAL":
      return "General Medicine";
    case "OFTALMOLOGIA":
      return "Ophthalmology";
    case "CANCELADO":
      return "Cancelled";
    case "ACEPTADO":
      return "Accepted";
    case "FINALIZADO":
      return "Finished";
    case "PACIENTE":
      return "Patient";
    case "NOMBRE DEL PACIENTE":
      return "Patient's name";
    case "DESCRIPCION":
      return "Description";
    case "ESPECIALISTA":
      return "Specialist";
    case "SIGUIENTE SEMANA":
      return "Next Week";
    case "REFRESH CAPTCHA":
      return "Refresh Captcha";
    case "CHECK":
      return "Check.";
    case "JUEVES":
      return "Thursday";
    case "DE":
      return "of";
    case "ENERO":
      return "January";
    case "FEBRERO":
      return "February";
    case "MARZO":
      return "March";
    case "ABRIL":
      return "April";
    case "MAYO":
      return "May";
    case "JUNIO":
      return "June";
    case "JULIO":
      return "July";
    case "Agosto":
      return "August";
    case "SEPTIEMBRE":
      return "September";
    case "OCTUBRE":
      return "October";    
    case "NOVIEMBRE":
      return "November";   
    case "DICIEMBRE":
      return "Dicember";    
    case "LUNES":
      return "Monday";          
    case "MARTES":
      return "Tuesday";    
    case "MIERCOLES":
      return "Wednesday";    
    case "VIERNES":
      return "Friday";  
    case "TURNO PARA EL DIA":
      return "Appointment for the day"; 
    case "DOCTOR":
      return "Doctor"; 
    case "ALTA DE TURNO":
      return "Create appointment"; 
    case "SOY PACIENTE":
      return "I'm patient";          
    case "ES MEDICO?":
      return "Is he a Doctor?";    
    case "CONFIRMACION":
      return "Confirmation";    
    case "ES MEDICO":
      return "Is a doctor";  
    case "ES PACIENTE":
      return "is a patient"; 
    case "DOWNLOAD":
      return "Download"; 
    case "ROL":
      return "Role";
    case "ADMIN":
      return "Adminstrator";
    case "PROFESIONAL":
      return "Professional";
  }
}

spanish(value){
  switch(value){
    case "HOME":
      return "Casa";
    case "DOWNLOAD":
      return "Descargar";
    case "ADMIN":
      return "Administrador";
    case "LOG OUT":
      return "Salir";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
    case "":
      return "";
  }
  //return value;

}

portugues(value){
  switch(value){
    case "HOME":
      return "Casa";
    case "ALTA":
      return "Crio";
    case "ALTA TURNO":
      return "Criar compromisso";
    case "MIS TURNOS":
      return "Meus Compromissos";
    case "LOG OUT":
      return "Sair";
    case "BIENVENIDO":
      return "Receber";
    case "MODIFICAR USUARIO":
      return "Modificar usuário";
    case "APELLIDO":
      return "Sobrenome";
    case "NOMBRE":
      return "Nome";
    case "DOCUMENTO":
      return "Documento";
    case "EMAIL":
      return "e-mail";
    case "GUARDAR":
      return "Salve";
    case "FECHA":
      return "Encontro";
    case "NOMBRE DEL MEDICO":
     return "Nome do médico";
    case "FOTO":
      return "Foto";
    case "ESTADO":
      return "Estado";
    case "IR A DETALLES":
      return "Vá para detalhes";
    case "ESPECIALIDAD":
      return "Especialidade";
    case "SELECCIONAR":
      return "Selecione";
    case "MODIFICAR USUARIO":
      return "Modificar usuário";
    case "MEDICINA GENERAL":
      return "Medicina Geral";
    case "OFTALMOLOGIA":
      return "Oftalmologia";
    case "CANCELADO":
      return "Cancelado";
    case "ACEPTADO":
      return "Aceitaram";
    case "FINALIZADO":
      return "Finilizado";
    case "PACIENTE":
      return "Paciente";
    case "NOMBRE DEL PACIENTE":
      return "Nome do paciente";
    case "DESCRIPCION":
      return "Descrição";
    case "ESPECIALISTA":
      return "Especialista";
    case "SIGUIENTE SEMANA":
      return "Semana que vem";
    case "REFRESH CAPTCHA":
      return "Atualizar Captcha";
    case "CHECK":
      return "Verificar";
    case "JUEVES":
      return "quinta-feira";
    case "DE":
      return "de";
    case "ENERO":
      return "Janeiro";
    case "FEBRERO":
      return "fevereiro";
    case "MARZO":
      return "Março";
    case "ABRIL":
      return "abril";
    case "MAYO":
      return "Maio";
    case "JUNIO":
      return "Junho";
    case "JULIO":
      return "julho";
    case "Agosto":
      return "agosto";
    case "SEPTIEMBRE":
      return "setembro";
    case "OCTUBRE":
      return "Outubro";    
    case "NOVIEMBRE":
      return "novembro";   
    case "DICIEMBRE":
      return "dezembro";    
    case "LUNES":
      return "Segunda-feira";          
    case "MARTES":
      return "terça-feira";    
    case "MIERCOLES":
      return "quarta-feira";    
    case "VIERNES":
      return "sexta-feira";  
    case "TURNO PARA EL DIA":
      return "Compromisso do dia"; 
    case "DOCTOR":
      return "Doutora"; 
    case "ALTA DE TURNO":
      return "Criar compromisso";
    case "SOY PACIENTE":
      return "paciente";          
    case "ES MEDICO?":
      return "Ele é médico?";    
    case "CONFIRMACION":
      return "Confirmação";    
    case "ES MEDICO":
      return "É um médico";  
    case "ES PACIENTE":
      return "paciente"; 
    case "DOWNLOAD":
      return "Download"; 
    case "ADMIN":
      return "Administrador";
    case "PROFESIONAL":
      return "profissional";
    case "ROL":
      return "Função";
  }
}

}


/*


*/

/*
Home 
Alta Turno
Mis Turnos
LOG OUT
BIENVENIDO

--USUARIO--
Modificar Usuario - Modifica utente
apellido - cognome
nombre - Nome
documento
email
guardar


--MIS TURNOS--
Especialidad - Specialità
FECHA - DATA
NOMBRE DEL MEDICO - NOME DEL MEDICO
DOCUMENTO - documenti 
FOTO - FOTO
ESTADO - CONDIZIONE
IR A DETALLES - VAI AI DETTAGLI
SELECCIONAR - SELEZIONARE

Finalizado - Finalizzato
Aceptado - Accettato
Cancelado - Annullato
Medicina General	 - Medicina generale
Oftalmología - Oftalmologia


--LOGIN--
Email
password
login
crear usuario
administrador
cliente 1
cliente 2
medico 1
medico 2
medico 3
medico 4
cleinte con mail verdadero


--ALTA--

PACIENTE.
NOMBRE DEL PACIENTE.
DOCUMENTO.
DESCRIPCION.
ESPECIALISTA.
MEDICINA GENERAL.
ODONTOLOGIA.
DEDOLOGIA.
OFTALMOLOGIA.
SIGUIENTE SEMANA.
REFRESH CAPTCHA.
CHECK.
Turno para el dia.
jueves.
de.
enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre
Doctor.


--TURNO--
NOMBRE
FECHA DE TURNO
AGREGAR COMENTARIO
profesional
cliente
recomendarias al paciente
tuvo buen manejo con la app
algun comentario extra
rango de felicidad
numero de paracetamol

paracetamol de numero 
rango de felicidad
algun comentario extra
recomendarias la clinica
recomendarias al doctor



*/