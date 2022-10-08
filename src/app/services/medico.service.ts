import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

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


  cargarMedicos()
  {
    const url = `${base_url}/medicos`;

    return this.http.get<Medico[]>(url,this.headers).pipe(
      map((resp:any) => {
        return resp.medicos;
      })
    );
  }

  obtenerMedicoPorId(id:string)
  {
    const url = `${base_url}/medicos/${id}`;

    return this.http.get<Medico[]>(url,this.headers).pipe(
      map((resp:any) => {
        return resp.medico;
      })
    );
  }

  crearMedico(medico:{nombre:string,hospital:string})
  {
    const url = `${base_url}/medicos`;
    return this.http.post(url,medico,this.headers);
  }

  actualizarMedico(medico:{nombre:string,hospital:string,_id:string})
  {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url,medico,this.headers);
  }

  eliminarMedico(id:string)
  {
    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url,this.headers);
  }

}
