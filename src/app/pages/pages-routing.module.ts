import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';

const routes:Routes = [
  {
    path:'dashboard',
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',component:DashboardComponent,data:{titulo: 'Dashboard'}},
      {path:'progress',component:ProgressComponent,data:{titulo: 'Progress'}},
      {path:'grafica1',component:Grafica1Component,data:{titulo: 'Grafica #1'}},   
      {path:'account-settings',component:AccountSettingsComponent,data:{titulo: 'Ajustes de Cuenta'}},   
      {path:'promesas',component:PromesasComponent,data:{titulo: 'Promesas'}},
      {path:'rxjs',component:RxjsComponent,data:{titulo: 'RxJs'}} ,
      {path:'perfil',component:PerfilComponent,data:{titulo: 'Perfil de Usuario'}},

      //Mantenimientos
      {path:'usuarios',component:UsuariosComponent,data:{titulo: 'Usuario de Aplicacion'}},
      {path:'hospitales',component:HospitalesComponent,data:{titulo: 'Mantenimiento de Hospitales'}},
      {path:'medicos',component:MedicosComponent,data:{titulo: 'Medicos'}},
      {path:'medico/:id',component:MedicoComponent,data:{titulo: 'Medicos'}},


    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
