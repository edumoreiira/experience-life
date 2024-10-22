import { Component, input, OnInit, output } from '@angular/core';
import { DropdownListOptions, DropdownSelectionComponent } from "../dropdown-selection/dropdown-selection.component";
import PaginatorComponent from "../paginator/paginator.component";
import { popUp, slide, slideUpDown } from '../../animations/transition-animations';
import { RankPlayers } from '../../models/rankPlayers.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [DropdownSelectionComponent, PaginatorComponent, CommonModule],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss',
  animations: [slideUpDown, popUp, slide]
})
export class RankComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;
  playersSubject = new BehaviorSubject<RankPlayers[]>([])
  players$: Observable<RankPlayers[]> = this.playersSubject.asObservable();
  pageHasLoaded = false;
  limited = input<boolean>(false);
  onLoadMore = output();

  
  
  ranks: DropdownListOptions[] = [
    {name: "Kills", isActive: false},
    {name: "Deaths", isActive: false},
    {name: "Dinheiro", isActive: false},
    {name: "Horas Jogadas", isActive: false},
    {name: "Nível", isActive: false},
    {name: "Crimes Cometidos", isActive: false},
    {name: "Vezes Presos", isActive: false},
  ]

  ngOnInit(): void {
    this.loadPlayers(this.currentPage);
    setTimeout(() => {
     this.pageHasLoaded = true; 
    }, 1000);
  }

  loadPlayers(currentPage: number){
    this.currentPage = currentPage;
    const start = (currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.playersSubject.next(this.rankPlayers.slice(start, end));
  } 

  onRankSelected(rank: DropdownListOptions){
    this.ranks.forEach(r => {
      r.isActive = false;
    })
    rank.isActive = true;
  }

  rankPlayers: RankPlayers[] = [
    {nickname: 'lijlfv', score: 74, position: 1},
    {nickname: 'erthta', score: 29, position: 2},
    {nickname: 'rxqszi', score: 73, position: 3},
    {nickname: 'wukydn', score: 72, position: 4},
    {nickname: 'ydjomr', score: 61, position: 5},
    {nickname: 'qiwicv', score: 71, position: 6},
    {nickname: 'jwikve', score: 5, position: 7},
    {nickname: 'sadwgn', score: 54, position: 8},
    {nickname: 'hsxtji', score: 99, position: 9},
    {nickname: 'qqbogk', score: 61, position: 10},
    {nickname: 'bpicil', score: 90, position: 11},
    {nickname: 'kvsxfl', score: 23, position: 12},
    {nickname: 'nvrwmd', score: 96, position: 13},
    {nickname: 'bgdmdw', score: 15, position: 14},
    {nickname: 'qrtjke', score: 10, position: 15},
    {nickname: 'wxehdm', score: 98, position: 16},
    {nickname: 'vmyssn', score: 9, position: 17},
    {nickname: 'hdzlnm', score: 15, position: 18},
    {nickname: 'iqktbt', score: 99, position: 19},
    {nickname: 'anqrxg', score: 73, position: 20},
    {nickname: 'dfqxdb', score: 44, position: 21},
    // {nickname: 'nnhtip', score: 57, position: 22},
    // {nickname: 'wsjmsj', score: 54, position: 23},
    // {nickname: 'egmnaz', score: 22, position: 24},
    // {nickname: 'ooahzi', score: 46, position: 25},
    // {nickname: 'imrlrp', score: 98, position: 26},
    // {nickname: 'rraevf', score: 47, position: 27},
    // {nickname: 'lovrse', score: 70, position: 28},
    // {nickname: 'mtkaie', score: 39, position: 29},
    // {nickname: 'kvnsao', score: 3, position: 30},
    // {nickname: 'oqqehw', score: 24, position: 31},
    // {nickname: 'oufhlq', score: 80, position: 32},
    // {nickname: 'adkfko', score: 19, position: 33},
    // {nickname: 'tsvrcd', score: 55, position: 34},
    // {nickname: 'vqsppb', score: 27, position: 35},
    // {nickname: 'tskipm', score: 74, position: 36},
    // {nickname: 'rzeaxs', score: 75, position: 37},
    // {nickname: 'ouvfmp', score: 16, position: 38},
    // {nickname: 'hhcajp', score: 5, position: 39},
    // {nickname: 'phkebr', score: 54, position: 40}
  ]

  limit = Math.ceil(this.rankPlayers.length / this.itemsPerPage);
  

}
