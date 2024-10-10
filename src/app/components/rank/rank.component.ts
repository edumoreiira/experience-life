import { Component } from '@angular/core';
import { DropdownListOptions, DropdownSelectionComponent } from "../dropdown-selection/dropdown-selection.component";

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [DropdownSelectionComponent],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent {
  ranks: DropdownListOptions[] = [
    {name: "Kills", isActive: false},
    {name: "Deaths", isActive: false},
    {name: "Dinheiro", isActive: false},
    {name: "Horas Jogadas", isActive: false},
    {name: "Nível", isActive: false},
    {name: "Crimes Cometidos", isActive: false},
    {name: "Vezes Presos", isActive: false},
  ]

  onRankSelected(rank: DropdownListOptions){
    this.ranks.forEach(r => {
      r.isActive = false;
    })
    rank.isActive = true;
  }

  rankPlayers = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

}
