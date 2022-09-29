import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm  = this.fb.group({
    nombre:    ['Carlos',Validators.required],
    email:     ['davidinojosa5@gmail.com',[Validators.required,Validators.email]],
    password:  ['1234',Validators.required],
    password2: ['1234',Validators.required],
    terminos:  [false,Validators.required]
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  crearUsuario()
  {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if(this.registerForm.invalid)
    {
      return ;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(data => {
      console.log('Usuario Creado');
      console.log(data);
    }, (err) => {
      Swal.fire('Error',err.error.msg,'error')
      console.warn(err.error.msg);
    });
   
  }

  campoNoValido(campo:string):boolean
  {
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  aceptaTerminos()
  {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas()
  {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) && this.formSubmitted)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  passwordsIguales(pass1:string,pass2:string)
  {
    return (formGroup:FormGroup) => {

        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);

        if(pass1Control?.value === pass2Control?.value)
        {
            pass2Control?.setErrors(null);
        }
        else
        {
          pass2Control?.setErrors({noEsIgual:true});
        }
    }
  }

}
