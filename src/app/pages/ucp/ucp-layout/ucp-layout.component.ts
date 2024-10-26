import { Component, HostBinding } from '@angular/core';
import { SidebarComponent, SidebarItem } from '../../../components/sidebar/sidebar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ModalComponent } from "../../../components/modal/modal.component";
import { ConfirmationDialogComponent } from "../../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-ucp-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, RouterModule, ModalComponent, ConfirmationDialogComponent],
  templateUrl: './ucp-layout.component.html',
  styleUrl: './ucp-layout.component.scss'
})
export class UcpLayoutComponent {
  version= '1.0.0';
  changePasswordModal: boolean = false;
  logoutConfirmationDialog: boolean = false;

  constructor( private router: Router) { }

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
      title: 'Ranking',
      icon: 'fi fi-rr-ranking-podium',
      route: 'ranking'
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
          route: '',
          onClick: () => this.openChangePasswordModal()
        },
        {
          title: 'Sair',
          onClick: () => this.openLogoutConfirmationDialog(),
        },
      ]
    },
  ]

  @HostBinding('class.ucp_c') get ucpContainer() {
    return true;
  }

  openChangePasswordModal() {
    this.changePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.changePasswordModal = false;
  }

  openLogoutConfirmationDialog() {
    this.logoutConfirmationDialog = true;
  }

  closeLogoutConfirmationDialog() {
    this.logoutConfirmationDialog = false;
  }

  onLogoutConfirmation(confirm: boolean) {
    if(confirm) {
      this.router.navigate(['/']);
      // handle logout
    }
    this.closeLogoutConfirmationDialog();
  }

}
