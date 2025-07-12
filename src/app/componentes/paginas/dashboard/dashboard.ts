import { Component, inject, OnInit } from '@angular/core';
import { Productos } from '../../../services/productos';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private productosService = inject(Productos);



  productos!: any[];

  ngOnInit(): void {



    this.productosService.getAllProductos().subscribe((res: any) => {
      this.productos = res.data;
      console.log('productos:', this.productos);
    });
  }

}
