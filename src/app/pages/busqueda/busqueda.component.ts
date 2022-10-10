import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[] = [];
  public medicos:Medico[] = [];
  public hospitales:Hospital[] = [];


  constructor(private activatedRoute:ActivatedRoute,
              private busquedasService:BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data:any) => {
      this.busquedaGlobal(data.termino);
    })

  }

  private busquedaGlobal(termino:string)
  {
      this.busquedasService.busquedaGlobal(termino).subscribe( (data:any) => {
        console.log(data);
        this.usuarios = data.usuarios;
        this.hospitales = data.hospitales;
        this.medicos = data.medicos;

      });
  }

}
