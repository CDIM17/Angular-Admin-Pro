import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { delay } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit,OnDestroy {

  public medicos:Medico[] = [];
  public medicosTemp:Medico[] = [];
  public cargando:boolean = true;

  private imgSubs!:Subscription;

  constructor(private medicosService:MedicoService,
              private modalImagenService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarMedicos();
    })

  }

  cargarMedicos()
  {
    this.cargando = true;

    this.medicosService.cargarMedicos().subscribe(data => {
      this.medicos = data;
      this.medicosTemp = data;
      this.cargando = false;
    })
  }

  abrirModal(medico:Medico)
  {
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);

  }

  buscarMedico(termino:string)
  {
    if(termino !== '')
    {
      this.busquedaService.buscar('medicos',termino).subscribe( data => {
        this.medicos = data;
      });
    }
    else
    {
      this.medicos = this.medicosTemp;
    }
  }

  borrarMedico(medico:Medico)
  {
    Swal.fire({
      title: 'Eliminar Medico?',
      text: `Estas a punto de borrar el medico ! ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

        if(result.isConfirmed)
        {
          this.medicosService.eliminarMedico(medico._id || '').subscribe( data => {
              Swal.fire('Actualizado', `El medico ${medico.nombre} ha sido eliminado`,'success');
              this.cargarMedicos();
          });
        }
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
