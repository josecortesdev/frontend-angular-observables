import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

import { IndexComponent } from '../index/index.component';
import { Sinid } from '../models/sinid';

import { DecimalPipe } from '@angular/common'; // para decimal pipe

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  productosCartera: Producto[] = [];

  duplicado: Producto[] = [];

  // sinid: Sinid[] = [];
  // sinrepetidos: Sinid[] = [];

  listaAdmin: Producto[] = [];

  //necesito dos variables

  isAdmin = false;

  //Para cargar usuario
  isLogged = false;
  nombreUsuario: string = ''; // vacío

  idcartera: string = 'juan';

  filterPost = '';

  constructor(

    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private DecimalPipe: DecimalPipe
  ) { }

  ngOnInit() {

    this.cargarProductos(); // Carga los productos


    this.isAdmin = this.tokenService.isAdmin();

  }

  // SistemaEuropeo(SistemaAmericano :number){ // Lo modifico
  //   let TerConComa = this.DecimalPipe.transform(SistemaAmericano, "1.2-2", 'es')
  //   return TerConComa;
  // }

  cargarProductos(): void {


   
    this.productoService.lista().subscribe(
      data => {
        this.productos = data; // lo carga en el Array que hemos creado, llamado productos

      },
      err => {
        console.log(err);
      }
    );

  }

  // cargasinid(productos: Producto[]) {

  //   for (let i = 0; i < productos.length; i++) {


  //     this.sinid.push({ nombre: productos[i].nombre, age: productos[i].age })

  //     let unicos = [];
  //     this.sinid.forEach(it => {
  //       if (unicos.indexOf(it) == -1)
  //         unicos.push(it);
  //     })

  //   }

  // }


  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Banda Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }



}
