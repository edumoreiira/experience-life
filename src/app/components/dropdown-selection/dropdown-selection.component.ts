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
  @Input({ required: true }) dropdownId: string = '';
  @Output() clickedItem = new EventEmitter<DropdownListOptions>;
  
  @ViewChild('DropdownButton') dropdown!: ElementRef;
  @ViewChild('DropdownMenu') dropdownMenu!: ElementRef;

  dropdownElement!: HTMLElement
  dropdownMenuId: string = `${this.dropdownId}-menu`;
  isExpanded: boolean = false;
  
  ngAfterViewInit(): void {
    this.dropdownElement = this.dropdown.nativeElement; // set the dropdown native element after view init
  }

  toggleDropDown(){
    this.isExpanded ? this.closeDropDown() : this.openDropDown();
  }

  openDropDown(){
    this.isExpanded = true;

    setTimeout(() => { // focus on the first item of the dropdown list
      const list = this.dropdownMenu.nativeElement as HTMLElement;
      const firstChild = list.querySelector('.dropdown__item') as HTMLElement;
      firstChild.focus();
    }, 100);
  }

  closeDropDown(){
    this.isExpanded = false;
    this.dropdownElement.focus();
  }

  onKeyDownItem(event: KeyboardEvent, item: DropdownListOptions) {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault(); // avoid spacebar to scroll the page
      this.onclickItem(item);
    }
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
