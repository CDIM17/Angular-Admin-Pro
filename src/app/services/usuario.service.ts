import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map, Observable, of, tap} from 'rxjs';
import { Router } from '@angular/router';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router) { }

  validarToken()
  {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap(
        (resp:any) => {
          localStorage.setItem('token',resp.token)
        }
      ),
      map(
        resp => 
        {
          return true
        }
      ),
      catchError(error => {
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
