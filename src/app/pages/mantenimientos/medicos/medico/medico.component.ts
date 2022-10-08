import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm!:FormGroup;
  public hospitales!:Hospital[];
  public hospitalSeleccionado!: Hospital | undefined;

  public medicoSeleccionado!:Medico;

  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private MedicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( (data:any) => {
      this.cargarMedico(data.id);
    });
    
    this.medicoForm = this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
    })

  }

  cargarHospitales()
  {
    this.hospitalService.cargarHospitales().subscribe(data => {
      this.hospitales = data;
    })
  }

  cargarMedico(id:string)
  {
    if(id === 'nuevo')
    {
      return ;
    }

    this.MedicoService.obtenerMedicoPorId(id).pipe(delay(100)).subscribe(data => {

      if(!data)
      {
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
      else
      {
        const {nombre,hospital:{_id}} = data;
        this.medicoSeleccionado       = data;
        this.medicoForm.setValue({nombre,hospital:_id});
      }
    }) 
  }

  guardarMedico()
  {
    if(this.medicoSeleccionado)
    {
      const data = {
       ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id || ''
      }

      this.MedicoService.actualizarMedico(data).subscribe( data => {
        Swal.fire('Actualizado',`El medico ${this.medicoSeleccionado.nombre} ha sido creado exitosamente!`,'success');
      });
    }
    else
    {
      this.MedicoService.crearMedico(this.medicoForm.value).subscribe( (data:any) => {
        const {nombre} = this.medicoForm.value;
        Swal.fire('Creado',`El medico ${nombre} ha sido creado exitosamente!`,'success');
        this.router.navigateByUrl(`/dashboard/medico/${data.medico._id}`)
      });
    }
  }

}
