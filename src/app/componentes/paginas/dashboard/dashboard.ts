import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Productos } from '../../../services/productos';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Dashboard implements OnInit {
  private router = inject(Router);
  private productosService = inject(Productos);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  userName!: string;
  productos: any[] = [];
  productoForm: FormGroup;
  selectedId: string | null = null;

  constructor() {
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      codigoOsku: ['', Validators.required],
      descripcion: [''],
      categoria: [''],
    });
  }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const tokenDecoded = jwtHelperService.decodeToken(token);
    this.userName = tokenDecoded.nombreUsuario;
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.getAllProductos().subscribe((res: any) => {
      this.productos = res.data;
    });
  }

  crearProducto() {
    if (this.productoForm.valid) {
      this.productosService.crearProducto(this.productoForm.value).subscribe(() => {
        this.obtenerProductos();
        this.productoForm.reset();
        this.toastr.success('Producto creado correctamente', '¡Éxito!');
      });
    } else {
      this.toastr.warning('Completa todos los campos requeridos', 'Formulario incompleto');
    }
  }

  editarProducto() {
    if (this.selectedId && this.productoForm.valid) {
      this.productosService.editarProducto(this.selectedId, this.productoForm.value).subscribe(() => {
        this.obtenerProductos();
        this.productoForm.reset();
        this.selectedId = null;
        this.toastr.success('Producto editado correctamente', 'Actualización exitosa');
      });
    } else {
      this.toastr.warning('No se pudo editar', 'Error');
    }
  }

  seleccionarProducto(producto: any) {
    this.selectedId = producto._id;
    this.productoForm.patchValue(producto);
  }

  eliminarProducto(id: string) {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmado) {
      this.productosService.eliminarProducto(id).subscribe(() => {
        this.obtenerProductos();
        this.toastr.info('Producto eliminado correctamente', 'Producto eliminado');
      });
    }
  }

  resetearFormulario() {
    this.productoForm.reset();
    this.selectedId = null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/sign-in');
  }
}