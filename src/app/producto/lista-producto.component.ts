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

  sinid: Sinid[] = [];
  sinrepetidos: Sinid[] = [];

  listaAdmin: Producto[] = []; 

  //necesito dos variables

  isAdmin = false;

  //PARA CARGAR USUARIO
  isLogged = false;
  nombreUsuario: string = ''; // vacío

  idcartera: string = 'juan';

  filterPost = '';

  constructor(
    
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
  //  private indexComponent: IndexComponent
  private DecimalPipe: DecimalPipe
  ) { }

  ngOnInit() {

this.cargarProductos(); // Carga los productos



    this.cargarusuario(); // Carga el usuario y también su cartera (con otro método)
   
    this.isAdmin = this.tokenService.isAdmin();
    
  }

// SistemaEuropeo(SistemaAmericano :number){ // Lo modifico
//   let TerConComa = this.DecimalPipe.transform(SistemaAmericano, "1.2-2", 'es')
//   return TerConComa;
// }

  cargarProductos(): void {


const admin = 'adminjose'
    this.productoService.cartera(admin).subscribe(
      data => {
        this.productos = data; // lo carga en el Array que hemos creado, llamado productos
        
      
      },
      err => {
        console.log(err);
      }
    );

  }

  cargasinid(productos: Producto[]){
  
    // for (let pr of this.productos){
    //   this.sinid.idcartera =   pr.idcartera;
    // }

    for(let i=0; i<productos.length; i++){


      this.sinid.push({nombre: productos[i].nombre, age: productos[i].age})

      // this.sinid[i].nombre = this.productos[i].nombre;
      // this.sinid[i].age = this.productos[i].age;
      // this.sinid[i].idcartera = this.productos[i].idcartera;
        
 
      
      let unicos = [ ];
this.sinid.forEach( it => {
  if (unicos.indexOf(it) == -1)
     unicos.push(it);
})


    }

  }
    
 
  
  //Para cargar el nombre del usuario
cargarusuario(){ // 
    if (this.tokenService.getToken()) { // si tiene token
      this.isLogged = true; // está logueado
      this.nombreUsuario = this.tokenService.getUserName(); // almacenamos el nombreusuario

       this.cargarCartera(this.nombreUsuario);   // Vamos al método cargarCartera para cargar los productos del usuario

    } else {
      this.isLogged = false;  // si no tiene token, no está logueado
      this.nombreUsuario = ''; // usuario se queda así
    }
   
  }

//Método para cargar los productos del usuario
  cargarCartera(nombreUsuario: string){

    //const miadmin = 'admin';
   // const nom = nombreUsuario;
    this.productoService.cartera(nombreUsuario).subscribe(
      data => {
        this.productosCartera = data; // lo carga en el Array que hemos creado, llamado productos
        
      
      },
      err => {
        console.log(err);
      }
    );

  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Banda Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
        this.cargarusuario();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

 


  

  
  Addcartera(nombre: string, origen: string, ticker: string, age: number): void {  // Para añadir producto a la cartera

   // this.cargarusuario();

//    console.log(this.nombreUsuario);

   
    const producto = new Producto(nombre, origen, ticker, age, this.nombreUsuario);    //this.index.nombreUsuario);


    this.productoService.addacartera(producto).subscribe(
      data => {
        this.toastr.success('Banda Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
        this.cargarCartera(this.nombreUsuario); // Carga la cartera con el nombre usuario
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
        // this.router.navigate(['/']);
      }
    );
  }



  duplicar(nombre: string, origen: string, ticker: string, age: number, idcartera: string): void {
  
    const producto = new Producto(nombre, origen, ticker, age, 'idcartera');   // this.index.nombreUsuario);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
        // this.router.navigate(['/']);
      }
    );
  }

}
