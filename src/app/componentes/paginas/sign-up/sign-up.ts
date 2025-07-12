import { Component } from '@angular/core';
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
  //router = inject(Router);
  //signupService = inject(SignupService);

  registerForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    confContrasena: new FormControl('', Validators.required),
  });

 /* handleSubmit() {
    if (this.registerForm.valid) {
      this.signupService
        .registerUser(this.registerForm.value)
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
  } */
}


