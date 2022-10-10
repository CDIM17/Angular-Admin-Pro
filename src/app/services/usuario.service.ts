import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, delay, map, Observable, of, tap} from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

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

  get role():string{
    return this.usuario.role || '';
  }

  get uid():string | undefined{
    return this.usuario.uid;
  }

  get headers()
  {
    return {
      headers: {
        'x-token':this.getToken
      }
    }
  }

  constructor(private http:HttpClient,
              private router:Router) { }

  guardarLocalStorage(token:string,menu:string)
  {
    localStorage.setItem('token',token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }            

  validarToken()
  {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,this.headers).pipe(
      tap(
        (resp:any) => {

          const {nombre,email,img,google,role,uid} = resp.usuario;
          this.usuario = new Usuario(nombre,email,'',img,google,role,uid);

          this.guardarLocalStorage(resp.token,resp.menu);
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

  cargarUsuarios(desde:number = 0)
  {
    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url,this.headers).pipe(
      delay(200),
      map(data => {

        const usuarios = data.usuarios.map(user => new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        ));

        return {
          usuarios,
          total:data.total
        }
        
      })
    );
  }

  crearUsuario(formData:any)
  {
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((data:any) => {
        this.guardarLocalStorage(data.token,data.menu);
      })
    );
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string})
  {
    data = {
      ...data,
      role:this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers);
  }

  guardarUsuario(usuario:Usuario)
  {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers);
  }

  eliminarUsuario(usuario:Usuario)
  {
    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete(url,this.headers);
  }

  login(formData:any)
  {
    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((data:any) => {
        this.guardarLocalStorage(data.token,data.menu);
      })
    );
  }

  loginGoogle(token:string)
  {
    return this.http.post(`${base_url}/login/google`,{token:token}).pipe(
      tap((data:any) => {
       // console.log(data.token);
        this.guardarLocalStorage(data.token,data.menu);
      })
    );
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');

    google.accounts.id.revoke('davidinojosa5@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }
}
