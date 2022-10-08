import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs';

import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales:Hospital[] = [];
  public hospitalesTemp:Hospital[] = [];
  public cargando:boolean = true;
  private imgSubs!:Subscription;

  constructor(private hospitalService:HospitalService,
              private modalImagenService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarHospitales();
    })
  }

  cargarHospitales()
  {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe(data => {
      this.hospitales = data;
      this.hospitalesTemp = data;
      this.cargando = false;
    })
  }

  guardarCambios(hospital:Hospital)
  {
    this.hospitalService.actualizarHospital(hospital.nombre || '',hospital._id || '').subscribe( data => {
        Swal.fire('Actualizado', `El hospital ${hospital.nombre} ha sido actualizado`,'success');
    });
  }

  eliminarHospital(hospital:Hospital)
  {
    Swal.fire({
      title: 'Eliminar Hospital?',
      text: `Estas a punto de borrar al hospital ! ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

        if(result.isConfirmed)
        {
            this.hospitalService.eliminarHospital(hospital._id || '').subscribe( data => {
              Swal.fire('Actualizado', `El hospital ${hospital.nombre} ha sido eliminado`,'success');
              this.cargarHospitales();
          });
        }
    })

  }

  async abrirSweetAlert()
  {
    const {value = ''} = await Swal.fire<string>({
      title:'Crear Hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton:true
    })
    
    if(value?.trim().length || ''.length > 0)
    {
      this.hospitalService.crearHospital(value || '').subscribe((data:any) => {
        console.log(value);
        this.hospitales.push(data.hospital);
      })
    }


  }

  abrirModal(hospital:Hospital)
  {
    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  buscarHospitales(termino:string)
  {
    if(termino !== '')
    {
      this.busquedaService.buscar('hospitales',termino).subscribe( data => {
        this.hospitales = data;
      });
    }
    else
    {
      this.hospitales = this.hospitalesTemp;
    }
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
