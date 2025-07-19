import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from '../../../services/signup';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  router = inject(Router)
  signupService = inject(SignupService);
  toastr = inject(ToastrService);

registerForm!: FormGroup; 

  constructor() {
    this.registerForm = new FormGroup(
      {
        nombreUsuario: new FormControl('', Validators.required),
        correo: new FormControl('', [Validators.required, Validators.email]),
        contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confContrasena: new FormControl('', Validators.required),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

passwordsMatchValidator: ValidatorFn = (form: AbstractControl): { [key: string]: boolean } | null => {
    const password = form.get('contrasena')?.value;
    const confirm = form.get('confContrasena')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  };

 handleSubmit() {
  //console.log('handle submit:', this.registerForm.value);
    /*if (this.registerForm.valid) {
      console.log('handle submit:', this.registerForm.value);
      this.signupService.registerUsuario((res: any) => {
        console.log('res:', res);
      });
    } else {
      console.log('Invalid form')
    } */

    if (this.registerForm.valid) {
      this.signupService.registerUsuario(this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.allOK) {
            this.toastr.success('Registro exitoso', 'Éxito 🎉');
            this.router.navigateByUrl('/sign-in');
          } else {
            this.toastr.error('No se pudo registrar el usuario', 'Error ❌');
          }
        },
        error: () => {
          this.toastr.error('Error del servidor', 'Error ❌');
        }
      });
    } else {
      this.toastr.warning('Por favor completa correctamente el formulario', 'Formulario inválido ⚠️');
    }
  }
}