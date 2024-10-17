import { Component } from '@angular/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { parentAnimations } from '../../animations/transition-animations';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginModalComponent, CommonModule, ButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [parentAnimations]
})
export class NavbarComponent {
  isLoginModalOpen: boolean = false;

  constructor(private router: Router) {}

  validateCurrentRoute(route: string) {
    if(route === 'home') {
      return this.router.url === '/';
    }
    return this.router.url.includes(route);
  }
  
  //show/hide navbar
  handleNavBar(element: HTMLElement) {
    element.classList.toggle('nav__items-wrapper--active');
  }

    // handle login modal
    openLoginModal() {
      this.isLoginModalOpen = true;
    }
  
    closeLoginModal() {
      this.isLoginModalOpen = false;
    }
}
