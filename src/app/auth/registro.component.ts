import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Similar al login, estas variables están copiadas

  nuevoUsuario: NuevoUsuario;
  name: string;
  password: string;
  password_confirmation: string;
  email: string;

  errMsj: string;

  cargandoRegistro: boolean = false;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  //Método para registrarse
  onRegister(): void {

    this.cargandoRegistro = true;

    this.nuevoUsuario = new NuevoUsuario(this.name, this.password, this.password_confirmation, this.email);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']); //va al login

    this.cargandoRegistro = false;
      },
      err => { // si hay error
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

        this.cargandoRegistro = false;

      }
    );
  }

}
