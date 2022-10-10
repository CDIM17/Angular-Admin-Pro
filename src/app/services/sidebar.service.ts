import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:any[] = [];

 /* menu:any[] = [
    {
        titulo:'Dashboard',
        icono:'mdi mdi-gauge',
        submenu: [
          {titulo:'Main',url:'/'},
          {titulo:'Graficas',url:'grafica1'},
          {titulo:'ProgressBar',url:'progress'},
          {titulo:'Promesas',url:'promesas'},
          {titulo:'Rxjs',url:'rxjs'}
        ]
    },
    {
      titulo:'Mantenimientos',
      icono:'mdi mdi-folder-lock-open',
      submenu: [
        {titulo:'Usuarios',url:'usuarios'},
        {titulo:'Hospitales',url:'hospitales'},
        {titulo:'Medicos',url:'medicos'},
      ]
  }    

  ];*/

  constructor() { }

  cargarMenu()
  {
    this.menu = JSON.parse(localStorage.getItem('menu') || '');
  }

  
}
