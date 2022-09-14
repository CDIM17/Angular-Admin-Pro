import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes:Routes = [
  {
    path:'dashboard',
    component:PagesComponent,
    children:[
      {path:'',component:DashboardComponent},
      {path:'progress',component:ProgressComponent},
      {path:'grafica1',component:Grafica1Component},   
      {path:'account-settings',component:AccountSettingsComponent},       
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
