import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm  = this.fb.group({
    email:     [localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:  ['',Validators.required],
    remember:  [Boolean(localStorage.getItem('remember') || false)]
  });


  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit()
  {
    google.accounts.id.initialize({
      client_id: "587527825454-6amemgfjfnnblugodisthvii0q6cfg96.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any)
  {
    //console.log({esto:this})
    //console.log("Encoded JWT ID token: " + response.credential);

    this.usuarioService.loginGoogle(response.credential).subscribe(data => {
      //console.log({login:data})
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      })
    })
  }

  login()
  {
      this.usuarioService.login(this.loginForm.value).subscribe(data => {
        
        if(this.loginForm.get('remember')?.value)
        {
          localStorage.setItem('email',this.loginForm.get('email')?.value || '');
          localStorage.setItem('remember',(this.loginForm.get('remember')?.value || '').toString())
        }
        else
        {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

        //Navegar al Dashboard
        this.router.navigate(['/']);

      },(err) => {
        Swal.fire('Error',err.error.msg,'error');
      })

  }

}
