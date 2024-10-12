import { CommonModule } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';
import { fadeInOut, parentAnimations, popUp, slideUpDown } from '../../animations/transition-animations';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  animations: [popUp, fadeInOut, parentAnimations, slideUpDown]
})
export default class PaginatorComponent {
  lastPage = input(1);
  currentPage = 1;
  secondToLastPage = this.lastPage() - 1;
  showPageSelector = false;
  pageSelectorError = false;
  pageSelectorInputValue = '';

  onPageSelected(page: number){
    if(page < 1 || page > this.lastPage()){
      return
    }
    this.currentPage = page
  }

  onPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
    }
  }

  onNextPage(){
    if(this.currentPage < this.lastPage()){
      this.currentPage++
    }
  }

  getButtonValue(offset: number): number {
    if(this.currentPage <= 2) {
      return 2 + offset;
    }

    if(this.lastPage() === 3 && this.currentPage === 3) { // fix for when there are only 3 pages
     return  2 + offset;
    }

    if(this.currentPage >= this.lastPage() - 1) { // if current page is the second to last page or last page
      return (this.lastPage() - 2) + offset;
    }

    return this.currentPage + offset;
  }
  
  get firstButtonValue(): number {
    return this.getButtonValue(-1)
  }
  
  get secondButtonValue(): number {
    return this.getButtonValue(0);
  }
  
  get thirdButtonValue(): number {
    return this.getButtonValue(1);
  }
  




  // Page Selector modal methods
  closePageSelector() {
    this.showPageSelector = false;
  }

  onClosePageSelector() {
    this.pageSelectorError = false;
    this.pageSelectorInputValue = '';
    this.closePageSelector();
  }

  onOpenPageSelector() {
    if(this.currentPage >= 3) {
      this.showPageSelector = true;
    }
  }

  showPageSelectorError() {
    this.pageSelectorError = true;
  }

  hideShowPageSelectorError() {
    this.pageSelectorError = false;
  }

  @HostListener('window:keydown', ['$event']) // close page selector on esc key press
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.showPageSelector) { // close page selector if open
        this.onClosePageSelector();
      }
    }
  }


  onSelectSpecificPage(page: string) {
    const pageNumber = parseInt(page, 10);
    if(pageNumber > this.lastPage() || pageNumber < 1 || isNaN(pageNumber)) {
      this.showPageSelectorError();
      return 
    }
    this.currentPage = pageNumber;
    this.onClosePageSelector();
  }
  
  // prevent user from entering numbers greater than the last page
  onPageSelectorInputChange(value: string, inputElement: HTMLInputElement) {
    const inputValue = parseInt(value, 10);

    if (isNaN(inputValue)) {
      this.pageSelectorInputValue = value;
      return;
    }

    if(inputValue > this.lastPage()) {
      this.pageSelectorInputValue = this.lastPage().toString();
      inputElement.value = this.lastPage().toString(); // update input value to last page number
    } else {
      this.pageSelectorInputValue = value; // update to allowed value

      if(this.pageSelectorError) {
        this.hideShowPageSelectorError();
      }
    }
  }

}
