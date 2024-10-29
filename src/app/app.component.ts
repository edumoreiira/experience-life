import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExperienceLife';

  constructor(private router: Router) {

  }

  isUcpRoute(): boolean {
    return this.router.url.includes('ucp');
  }
}
