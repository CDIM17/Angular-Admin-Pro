import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profileForm!:FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService) {

              this.usuario = this.usuarioService.usuario;

               }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    })

  }

  actualizarPerfil()
  {
    this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe(
      data => {
        const {nombre,email} = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email  = email;

        Swal.fire('Usuario Actualizado','Cambios fueron Guardados','success');
      },
      error => {
        console.log(error);
        Swal.fire('Error',error.error.msg,'error');
      }
    )
    
  }

  cambiarImagen(event:any)
  {
    const file = event.target.files[0];
    console.log(event);
    console.log(file);

    this.imagenSubir = file;

    if(!file)
    {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64  = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return this.imgTemp;

  }

  subirImagen()
  {
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid || '')
    .then(img => {
      this.usuario.img = img;
      Swal.fire('Imagen Actualizada','Proceso cumplido exitosamente!!','success');
    }).catch(error => {
      Swal.fire('Error','No se pudo subir la imagen!!','error');
    });
  }

}
