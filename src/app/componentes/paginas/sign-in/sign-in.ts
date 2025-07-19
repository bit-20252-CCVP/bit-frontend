import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { SigninService } from '../../../services/signin';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  router = inject(Router);
  toastrService = inject (ToastrService);
  signinService = inject(SigninService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.loginForm.valid) {
      this.signinService.loginUser(this.loginForm.value).subscribe(
        (data: any) => {
          if (data.allOK) {
            this.toastrService.success(data.message);
            localStorage.setItem('token', data.data);
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error: any) => {
          this.toastrService.error(error.statusText, 'A ocurrido un Error, usuario o contraseña no valida');
        }
      );
    } else {
      this.toastrService.warning('Formulario no válido, todos los campos son obligatorios.');
    }
  }
}

