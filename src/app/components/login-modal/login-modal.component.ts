import { Component, output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../models/login-form.interface';
import { fadeInOut, parentAnimations, popUp, slideUpDown } from '../../animations/transition-animations';
import { Router } from '@angular/router';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  animations: [popUp, fadeInOut, slideUpDown, parentAnimations]
})
export class LoginModalComponent {
  loginForm!: FormGroup<LoginForm>;
  onCloseLoginModal = output();
  showLoginModal = true;

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
  closeLoginModal() {
    this.showLoginModal = false;
    this.onCloseLoginModal.emit()
  }
}
