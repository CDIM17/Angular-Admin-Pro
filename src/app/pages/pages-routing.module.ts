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


const routes:Routes = [
  {
    path:'dashboard',
    component:PagesComponent,
    children:[
      {path:'',component:DashboardComponent,data:{titulo: 'Dashboard'}},
      {path:'progress',component:ProgressComponent,data:{titulo: 'Progress'}},
      {path:'grafica1',component:Grafica1Component,data:{titulo: 'Grafica #1'}},   
      {path:'account-settings',component:AccountSettingsComponent,data:{titulo: 'Ajustes de Cuenta'}},   
      {path:'promesas',component:PromesasComponent,data:{titulo: 'Promesas'}},
      {path:'rxjs',component:RxjsComponent,data:{titulo: 'RxJs'}} 
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
