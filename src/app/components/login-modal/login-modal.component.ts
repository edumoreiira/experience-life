import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../models/login-form.interface';
import { fadeInOut, popUp } from '../../animations/transition-animations';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  animations: [popUp, fadeInOut]
})
export class LoginModalComponent {

  loginForm!: FormGroup<LoginForm>;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { 
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
