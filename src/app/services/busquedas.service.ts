import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {catchError, delay, map, Observable, of, tap} from 'rxjs';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados:any[]):Usuario[]
  {
    return resultados.map(
      user => new Usuario(
        user.nombre,
        user.email,
        '',
        user.img,
        user.google,
        user.role,
        user.uid
      
      )
    )
  }

  buscar(tipo:'usuarios' | 'medicos' | 'hospitales',
         termino:string)
  {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<CargarUsuario>(url,this.headers).pipe(
      map( (data:any) => {
        
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(data.data);
            break;
        
          default:
            return [];
            break;
        }

      })
    )
  }

}
