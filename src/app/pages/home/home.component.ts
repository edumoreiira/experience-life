import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import {  ClipboardModule } from '@angular/cdk/clipboard';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { parentAnimations, slide } from '../../animations/transition-animations';
import { ServerService } from '../../services/server.service';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { SampServer } from '../../models/samp-server.interface';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from "../../components/login-modal/login-modal.component";
import { Router } from '@angular/router';
import { RoundedButtonComponent } from '../../components/button/rounded-button/rounded-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  host: {
    '[class.home_c]': 'true'
  },
  imports: [RoundedButtonComponent, CardComponent, FooterComponent, ClipboardModule, FormsModule, CommonModule, LoginModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [slide, parentAnimations]
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoginModalOpen: boolean = false;
  copied = false;
  serverInfo$: Observable<SampServer> = new Observable<SampServer>();
  @ViewChild('slider_wrapper', { read: ElementRef }) sliderWrapper!: ElementRef<HTMLElement>;
  @ViewChild('slider', { read: ElementRef }) slider!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const sliderWrapperElement: HTMLElement = this.sliderWrapper.nativeElement;
    const sliderElement: HTMLElement = this.slider.nativeElement; 

    if (typeof window !== 'undefined') { // Código de manipulação do DOM só é executado no browser
      if(sliderElement && sliderWrapperElement) { 
        const clone = sliderElement!.cloneNode(true) as HTMLElement; //clone all cards
        sliderWrapperElement?.append(clone); //add all cloned cards to wrapper
    
        if (typeof document !== 'undefined') { // Código de manipulação do DOM só é executado no browser
          const e = document.querySelectorAll('.rank__slider');
          //add slide animation after loading all cloned slides to avoid desync.
          setTimeout(() => {
            e.forEach((e)=>e.classList.add('rank__slider--animate'));
          }, 300);
        }
      }
    }
  }

  constructor(
    private serverService: ServerService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getServerData();
  }

  //show/hide navbar
  handleNavBar(element: HTMLElement) {
    element.classList.toggle('nav__items-wrapper--active');
  }

  // show/hide copied alert
  handleCopyIp() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  // handle login modal
  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  getServerData() {
    this.serverInfo$ = this.serverService.getServerData().pipe(
      take(1),
      catchError(err => {
        console.error("Erro ao obter dados do servidor:", err);
        const manipulatedServer: SampServer = {
          id: 0,
          success: false,
          lastUpdated: '',
          worldTime: '',
          playersOnline: 0,
          maxPlayers: 0,
          isOpenMp: false,
          lagComp: false,
          name: 'Brasil Experience Life (Android/PC)',
          gameMode: 'N/A',
          ipAddr: 'N/A',
          mapName: 'N/A',
          website: 'N/A',
          version: 'N/A',
          language: 'N/A',
          sampCac: 'N/A',
          requiresPassword: false,
          shuffledOrder: 0,
          sponsor: false
        };
  
        // Retorna o Observable com os valores manipulados
        return of(manipulatedServer);
      }),
    );
  }

  
}
