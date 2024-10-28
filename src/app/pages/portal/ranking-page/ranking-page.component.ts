import { Component } from '@angular/core';
import { RankComponent } from '../../../components/layout/rank/rank.component';
import { ModalComponent } from "../../../components/dialogs/base/modal/modal.component";
import { ButtonComponent } from '../../../components/base/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranking-page',
  standalone: true,
  imports: [RankComponent, ModalComponent, ButtonComponent, RouterLink],
  templateUrl: './ranking-page.component.html',
  styleUrl: './ranking-page.component.scss'
})
export class RankingPageComponent {
  viewMoreModal = false;

  closeViewMoreModal(){
    this.viewMoreModal = false;
  }

  openViewMoreModal(){
    this.viewMoreModal = true;
  }
}
