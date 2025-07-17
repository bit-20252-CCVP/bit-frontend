import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Productos {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:4100/productos';

  getAllProductos() {
    return this.httpClient.get(this.apiUrl);
  }

  crearProducto(producto: any) {
  return this.httpClient.post(this.apiUrl, producto);
  }

  editarProducto(id: string, producto: any) {
  return this.httpClient.put(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string) {
  return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
