import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /*const promesa = new Promise( (resolve,reject) => {

      if(false)
      {
        resolve('Hola Mundo');

      }
      else
      {
        reject('Algo Salio Mal');
      }

    } );

    promesa.then( (mensaje) => {

      console.log(mensaje);

    }).catch(error => console.log('Error en mi promesa',error));

    console.log('Fin del init');*/

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios()
  {
        /*fetch('https://reqres.in/api/users')
        .then(resp => {
    
          resp.json().then(body => {
            console.log(body);
          })
          
        })*/
    
        /*const promesa = new Promise(resolve => {
    
          fetch('https://reqres.in/api/users')
          .then(resp => resp.json())
          .then(body => resolve(body.data));
    
        })
    
       return promesa;*/
    
       return new Promise(resolve => {
    
        fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    
      })

  }

}
