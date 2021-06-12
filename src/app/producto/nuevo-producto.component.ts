import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  name = '';
  price: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
  ) { 

    // Popover que uso para informar al usuario del lugar donde se encuentra el ID de los vídeos de Youtube
    $(document).ready(function () {
      (<any>$('[data-toggle="popover"]')).popover({
        placement: 'top',
        trigger: 'hover'
      });
    });
  }

  ngOnInit() {
  }

  //Crear uno nuevo
  onCreate(): void {

    const producto = new Producto(this.name, this.price);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Banda Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );
  }

}
