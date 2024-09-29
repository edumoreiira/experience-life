import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ucp-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './ucp-layout.component.html',
  styleUrl: './ucp-layout.component.scss'
})
export class UcpLayoutComponent {
  version= '1.0.0';

}
