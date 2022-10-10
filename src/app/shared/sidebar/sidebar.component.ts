import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems!:any[];
  public usuario!:Usuario;

  constructor(public sidebarService:SidebarService,
              private usuarioService:UsuarioService) { 

    //this.menuItems = sidebarService.menu;
    this.sidebarService.cargarMenu();

    //console.log(this.menuItems);

    this.usuario = this.usuarioService.usuario;

  }

  ngOnInit(): void {
  }

}
