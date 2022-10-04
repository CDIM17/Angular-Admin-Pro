import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public total_usuarios:number  = 0;
  public usuarios:Usuario[]     = [];
  public usuariosTemp:Usuario[] = [];

  public imgSubs!:Subscription;

  public desde:number          = 0;
  public cargando:boolean = true;

  constructor(private usuariosService:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarUsuarios();
    })

  }

  cargarUsuarios()
  {
    this.cargando = true;

    this.usuariosService.cargarUsuarios(this.desde).subscribe(({total,usuarios}) => {

      this.total_usuarios = total;
      this.usuarios       = usuarios;
      this.usuariosTemp   = usuarios;

      this.cargando = false;
    })
  }

  cambiarPagina(valor:number)
  {
    this.desde += valor;

    if(this.desde < 0)
    {
      this.desde = 0;
    }
    else if(this.desde >= this.total_usuarios)
    {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino:string)
  {
    if(termino.length === 0)
    {
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedasService.buscar('usuarios',termino).subscribe(data => {
      this.usuarios = data;
    })
  }

  eliminarUsuario(usuario:Usuario)
  {
    Swal.fire({
      title: 'Eliminar Usuario?',
      text: `Estas a punto de borrar a ! ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {

        if(this.retornarMismoUsuario(usuario))
        {
          Swal.fire(
            'Error!',
            `No Puede Borrarse asi mismo`,
            'error'
          );

          return ;
        }

        this.usuariosService.eliminarUsuario(usuario).subscribe( data => {

          this.cargarUsuarios();

          Swal.fire(
            'Eliminado!',
            `El Usuario ${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        })
      }
    })
  }

  retornarMismoUsuario(usuario:Usuario)
  {
      if(usuario.uid === this.usuariosService.uid)
      {
        return true;
      }
      else
      {
        return false;
      }
  }

  cambiarRole(usuario:Usuario)
  {
    this.usuariosService.guardarUsuario(usuario).subscribe();
  }

  abrirModal(usuario:Usuario)
  {
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
