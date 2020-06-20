import { SigninComponent } from './componentes/signin/signin.component';
import { AltaComponent } from './componentes/turnos/alta/alta.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/*import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { AltaComponent } from './componentes/peliculas/alta/alta.component';
import { ListadoComponent } from './componentes/actor/listado/listado.component';
import { TablaPeliculaComponent } from './componentes/peliculas/tabla-pelicula/tabla-pelicula.component';
import {ListadoPeliculasComponent} from '../app/componentes/peliculas/listado/listado.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { DetallePeliculaComponent } from './componentes/peliculas/detalle-pelicula/detalle-pelicula.component';
import { TablaActorComponent } from './componentes/actor/tabla-actor/tabla-actor.component';
import { AltaActorComponent } from './componentes/actor/alta/alta.component';


import {ListadoPaisesComponent} from '../app/paises/listado-paises/listado-paises.component';
import {DetallePaisComponent} from '../app/paises/detalle-pais/detalle-pais.component';
import {TablaPaisesComponent} from '../app/paises/tabla-paises/tabla-paises.component';
*/


/*
const MiRuteo = [
  {path: '' , component: BienvenidaComponent },
  {path: 'Bienvenida' , component: BienvenidaComponent},
  {path: 'Busqueda' , component: BusquedaComponent},
  {path: 'Actor', BienvenidaComponent,
    children: [
      {path: 'Actor/AltaActor' , component: AltaActorComponent},
      {path: 'Actor/ListadoActor' , component: ListadoComponent},
      {path: 'Actor/TablaActor' , component: TablaActorComponent}]
  },
  {path: 'Pelicula', BienvenidaComponent,
    children: [
      {path: 'AltaPeliculas' , component: AltaComponent},
      {path: 'ListadoPeliculas', component: ListadoPeliculasComponent},
      {path: 'TablaPeliculas' , component: TablaPeliculaComponent},
      {path: 'DetallePelicula' , component: DetallePeliculaComponent}
    ]
  }];*/ 




const MiRuteo = [
  
  {path: 'login' , component: LoginComponent},
  {path: 'signIn' , component: SigninComponent},
  {path: '' , component: LoginComponent},
  //{path: 'Turno/Alta', component: AltaComponent},
  {path: 'Home' , component: HomeComponent,
  children: [
    {path: 'Turno/Alta', component: AltaComponent}
    /*{path: 'Actor/AltaActor' , component: AltaActorComponent},
    {path: 'Actor/ListadoActor' , component: ListadoComponent},
    {path: 'Actor/TablaActor' , component: TablaActorComponent},
    {path: 'Pelicula/AltaPeliculas' , component: AltaComponent},
    {path: 'Pelicula/ListadoPeliculas', component: ListadoPeliculasComponent},
    {path: 'Pelicula/TablaPeliculas' , component: TablaPeliculaComponent},
    {path: 'Pelicula/DetallePelicula' , component: DetallePeliculaComponent},
    {path: 'Bienvenida' , component: BienvenidaComponent},
    {path: 'Busqueda' , component: BusquedaComponent},
    {path: 'Pais/listaPais' , component: ListadoPaisesComponent},
    {path: 'Pais/tablaPais' , component: TablaPaisesComponent},
    {path: 'Pais/detallePais' , component: DetallePaisComponent}
  */]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, 
    RouterModule.forRoot(MiRuteo, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
