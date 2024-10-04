import { Component, HostBinding } from '@angular/core';
import { SidebarComponent, SidebarItem } from '../../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ucp-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, RouterModule],
  templateUrl: './ucp-layout.component.html',
  styleUrl: './ucp-layout.component.scss'
})
export class UcpLayoutComponent {
  version= '1.0.0';

  navbarItems: SidebarItem[] = [
    {
      title: 'Perfil',
      icon: 'fi fi-rr-dashboard-panel',
      route: 'profile'
    },
    {
      title: 'Loja',
      icon: 'fi fi-rr-basket-shopping-minus',
      route: 'store'
    }, 
    {
      title: 'Administração',
      icon: 'fi fi-rr-document-gear',
      route: 'dropdown',
      options: [
        {
          title: 'Denúncias',
          route: ''
        },
        {
          title: 'Edições de RG',
          route: ''
        },
        {
          title: 'Revisões de banimento',
          route: ''
        },
      ]
    },
    {
      title: 'Empresas',
      icon: 'fi fi-rr-building',
      route: ''
    },
    {
      title: 'Denúncias',
      icon: 'fi fi-rr-auction',
      route: ''
    },
  ]

  bottomItems: SidebarItem[] = [
    {
      title: 'Configurações',
      icon: 'fi fi-rr-settings',
      route: 'dropdown',
      options: [
        {
          title: 'Alterar senha',
          route: ''
        },
        {
          title: 'Sair',
          route: ''
        },
      ]
    },
  ]

  @HostBinding('class.ucp_c') get ucpContainer() {
    return true;
  }

}
