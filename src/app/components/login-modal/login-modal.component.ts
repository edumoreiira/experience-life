import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../models/login-form.interface';
import { fadeInOut, popUp, slideUpDown } from '../../animations/transition-animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  animations: [popUp, fadeInOut, slideUpDown]
})
export class LoginModalComponent {

  loginForm!: FormGroup<LoginForm>;
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private route: Router
  ) { 
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      setTimeout(() => {
        this.route.navigate(['ucp/profile']);
      }, 1000);
    }
  }
}
