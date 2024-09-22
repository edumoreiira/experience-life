import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CardComponent } from "../../components/card/card.component";
import e from 'express';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
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

}
