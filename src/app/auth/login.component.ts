import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

//Se utilizará para comprobar si estamos o no estamos logueados 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variables que nos hacen falta

  loginUsuario: LoginUsuario; // loginusuario, que es un objeto de la clase login-usuario.ts

  cargandoLogin: boolean = false;

  //dos campos, nombre y password, los valores que les pasa al loginusuario
  email: string;
  password: string;
  errMsj: string;  // creada para usarla en el mensaje de error

  constructor( // inyectamos el tokenservice, auth, router y toastr
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  // Método para hacer el login
  onLogin(): void {

    this.cargandoLogin = true;

    //inicializamos el loginusuario y le pasamos el usuario y el password
    this.loginUsuario = new LoginUsuario(this.email, this.password);

    window.localStorage.UserEmail  = this.email;

    //Vamos a enviarlo al authservice
    this.authService.login(this.loginUsuario).subscribe( //loginusuario y nos suscribimos
      data => { // hacemos un callback
        this.tokenService.setToken(data.token);
        console.log(data.user);
        this.router.navigate(['/']);  // lo mandamos al index

        this.cargandoLogin = false;     
      },
      err => { // en caso de error
        this.errMsj = err.error.message;  // variable que habíamos creado para el error, saldrá el mensaje del backend
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

        this.cargandoLogin = false;   

      }
    );
  }

}
