import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';

const routes:Routes = [

  {path:'',pathMatch:'full',redirectTo:'dashboard'},
  {path:'**',component:NotPageFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
