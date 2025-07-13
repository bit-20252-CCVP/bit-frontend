import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SignupService } from '../../../services/signup';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  router = inject(Router)
  signupService = inject(SignupService);

  registerForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    confContrasena: new FormControl('', Validators.required),
  });

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
      this.signupService
        .registerUsuario(this.registerForm.value)
        .subscribe((res: any) => {
          if (res.allOK) {
            this.router.navigateByUrl('/sign-in');
          } else {
            // TODO: notify
            console.log('An error occurred');
          }
        });
    } else {
      // TODO: notify
      console.log('Invalid form');
    } 
  } 
}


