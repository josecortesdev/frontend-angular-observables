import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { DecimalPipe } from '@angular/common'; // para el decimal
import { parse } from 'querystring';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {



  nombreUsuario: string; // vacío

 

  constructor(private tokenService: TokenService, private DecimalPipe: DecimalPipe) {

  }

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }




}
