import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/layout/footer/footer.component';
import { NavbarComponent } from '../../../components/layout/navbar/navbar.component';
import { HomeComponent } from "../home/home.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  host: {
    '[class.portal_c]': 'true'
  },
  imports: [FooterComponent, NavbarComponent, HomeComponent, RouterOutlet],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent {

}
