import { Component } from '@angular/core';
import { RankComponent } from '../../../components/rank/rank.component';

@Component({
  selector: 'app-ranking-page',
  standalone: true,
  imports: [RankComponent],
  templateUrl: './ranking-page.component.html',
  styleUrl: './ranking-page.component.scss'
})
export class RankingPageComponent {

}
