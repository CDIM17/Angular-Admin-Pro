import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(public modalImagenService:ModalImagenService,
              public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal()
  {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event:any)
  {
    const file = event.target.files[0];
    //console.log(event);
    //console.log(file);

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
    const id = this.modalImagenService.id || '';
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id)
    .then(img => {
      Swal.fire('Imagen Actualizada','Proceso cumplido exitosamente!!','success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch(error => {
      Swal.fire('Error','No se pudo subir la imagen!!','error');
    });
  }

}
