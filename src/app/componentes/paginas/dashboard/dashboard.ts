import { Component, inject, OnInit } from '@angular/core';
import { Productos } from '../../../services/productos';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private productosService = inject(Productos);


  userName!: string;
  productos!: any[];

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const tokenDecoded = jwtHelperService.decodeToken(token);
    this.userName = tokenDecoded.nombreUsuario;

    this.productosService.getAllProductos().subscribe((res: any) => {
      this.productos = res.data;
      console.log('productos:', this.productos);
    });
  }

}
