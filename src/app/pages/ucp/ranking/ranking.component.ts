import { Component } from '@angular/core';
import { RankComponent } from '../../../components/rank/rank.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RankComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

}
