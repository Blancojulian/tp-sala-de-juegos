import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
//private reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //regex para que tenga por lo menos una letra y un numero
  //private rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  form: FormGroup = new FormGroup({
    nombreYApellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreYApellido:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]

    }, {
      validators: []
    })
  }
  async onSubmit() {
    
    this.submitted = true;

    if (this.form.valid) {
      try {
        const credentials = await this.authService.register(
          this.form.controls['email'].value,
          this.form.controls['password'].value,
          this.form.controls['nombreYApellido'].value
        );
        await this.logService.crearLog({email: credentials.user.email || 'Sin email', userId: credentials.user.uid  });

        await Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se ha Registrado con exito'
        });
        await this.router.navigateByUrl('/home');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: (err as Error)?.message || 'Ocurrio un error'
        })
      }
      
    }
  }

  private match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
