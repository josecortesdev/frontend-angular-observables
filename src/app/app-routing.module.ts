import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService } from './guards/prod-guard.service';



import { LoginGuard } from './guards/login.guard';



const routes: Routes = [
  { path: '', component: IndexComponent },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  //En lista y detalle, podemos acceder y tiene en cuenta si soy admin o user
  { path: 'lista', component: ListaProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  //En nuevo y editar, solo podemos siendo adminitrador
  { path: 'nuevo', component: NuevoProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'editar/:id', component: EditarProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
