import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map, Observable, of, tap} from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!:Usuario;

  get getToken()
  {
    return localStorage.getItem('token') || '';
  }

  get uid():string | undefined{
    return this.usuario.uid;
  }

  constructor(private http:HttpClient,
              private router:Router) { }

  validarToken()
  {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.getToken
      }
    }).pipe(
      tap(
        (resp:any) => {

          const {nombre,email,img,google,role,uid} = resp.usuario;
          this.usuario = new Usuario(nombre,email,'',img,google,role,uid);

          localStorage.setItem('token',resp.token);
        }
      ),
      map(
        resp => 
        {
          return true
        }
      ),
      catchError(error => {
        console.log(error);
        return of(false)
      }
        
      )
    );
  }

  crearUsuario(formData:any)
  {
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((data:any) => {
        localStorage.setItem('token',data.token)
      })
    );
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string})
  {
    data = {
      ...data,
      role:this.usuario.role || ''
    }

      return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
          headers:{
            'x-token':this.getToken
          }
        });
  }

  login(formData:any)
  {
    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((data:any) => {
        localStorage.setItem('token',data.token)
      })
    );
  }

  loginGoogle(token:string)
  {
    return this.http.post(`${base_url}/login/google`,{token:token}).pipe(
      tap((data:any) => {
       // console.log(data.token);
        localStorage.setItem('token',data.token);
      })
    );
  }

  logout()
  {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');

    google.accounts.id.revoke('davidinojosa5@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }
}
