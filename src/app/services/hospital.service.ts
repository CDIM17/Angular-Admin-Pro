import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators';

import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient,
    private router:Router) { }

  get getToken()
  {
    return localStorage.getItem('token') || '';
  }

  get headers()
  {
    return {
      headers: {
        'x-token':this.getToken
      }
    }
  }

  cargarHospitales()
  {
    const url = `${base_url}/hospitales`;

    return this.http.get<Hospital[]>(url,this.headers).pipe(
      map((resp:any) => {
        return resp.hospitales;
      })
    );
  }

  crearHospital(nombre:string)
  {
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre},this.headers);
  }

  actualizarHospital(nombre:string,id:string)
  {
    const url = `${base_url}/hospitales/${id}`;
    return this.http.put(url,{nombre},this.headers);
  }

  eliminarHospital(id:string)
  {
    const url = `${base_url}/hospitales/${id}`;
    return this.http.delete(url,this.headers);
  }

}
