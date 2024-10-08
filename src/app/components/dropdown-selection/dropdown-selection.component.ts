import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { popUp, slideUpDown } from '../../animations/transition-animations';

export interface DropdownListOptions{
  name: string,
  isActive: boolean
}

@Component({
  selector: 'app-dropdown-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-selection.component.html',
  styleUrl: './dropdown-selection.component.scss',
  animations: [slideUpDown, popUp]
})

export class DropdownSelectionComponent implements AfterViewInit{
  @Input() name: string = "Dropdown";
  @Input({ required: true }) items: DropdownListOptions[] = [];
  @Output() clickedItem = new EventEmitter<DropdownListOptions>;
  
  @ViewChild('DropdownButton') dropdown!: ElementRef;

  dropdownElement!: HTMLElement
  isExpanded: boolean = false;
  
  ngAfterViewInit(): void {
    this.dropdownElement = this.dropdown.nativeElement; // set the dropdown native element after view init
  }

  toggleDropDown(){
    this.isExpanded = !this.isExpanded
    const isExpanded = this.isExpanded ? 'true' : 'false'
    this.dropdownElement.setAttribute('aria-expanded', isExpanded)
  }

  openDropDown(){
    this.isExpanded = true;
    this.dropdownElement.setAttribute('aria-expanded', 'true')
  }

  closeDropDown(){
    this.isExpanded = false;
    this.dropdownElement.setAttribute('aria-expanded', 'false')
  }

  @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent){
      if(this.isExpanded == true){
        const element = event.target as HTMLElement;
        const clickInsideDropdown = ( element.classList.contains("dropdown__item") || element.classList.contains("dropdown__button") );

        if(!clickInsideDropdown){
          this.closeDropDown();
        }
      }
    }

    onclickItem(item: DropdownListOptions){
      this.clickedItem.emit(item);
      setTimeout(() => {
        this.name = item.name;
        this.closeDropDown();
      }, 100);
    }
  

  
}
