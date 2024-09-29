import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClipboardModule, SidebarComponent, CommonModule, RouterModule],
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
