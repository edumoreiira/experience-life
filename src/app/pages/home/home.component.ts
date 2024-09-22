import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CardComponent } from "../../components/card/card.component";
import e from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('slider_wrapper', { read: ElementRef }) sliderWrapper!: ElementRef;
  @ViewChild('slider', { read: ElementRef }) slider!: ElementRef;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const sliderWrapperElement: HTMLElement = this.sliderWrapper.nativeElement;
    const sliderElement: HTMLElement = this.slider.nativeElement; 
    //clone all cards
    const clone = sliderElement!.cloneNode(true) as HTMLElement;
    //add all cloned cards to wrapper
    sliderWrapperElement?.append(clone);

    //add slide animation after loading all cloned slides to avoid desync.
    const e = document.querySelectorAll('.rank__slider');
    setTimeout(() => {
      e.forEach((e)=>e.classList.add('rank__slider--animate'));
    }, 300);
    

  }

}
