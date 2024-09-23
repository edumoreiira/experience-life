import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CardComponent } from "../../components/card/card.component";
import {  ClipboardModule } from '@angular/cdk/clipboard';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { slide } from '../../animations/transition-animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CardComponent, FooterComponent, ClipboardModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [slide]
})
export class HomeComponent implements AfterViewInit {
  copied = false;
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

  constructor() { }

  //handle navbar
  handleNavBar(element: HTMLElement) {
    element.classList.toggle('nav__items-wrapper--active');
  }

  handleCopyIp() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
