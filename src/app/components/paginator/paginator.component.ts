import { CommonModule } from '@angular/common';
import { Component, HostListener, input, output } from '@angular/core';
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
  limit = input<number>(1);
  startsAt = input<number>(1);
  getCurrentPage = output<number>();


  
  currentPage = this.startsAt();
  secondToLastPage = this.limit() - 1;
  showPageSelector = false;
  pageSelectorError = false;
  pageSelectorInputValue = '';

  selectPage(page: number) {
    this.currentPage = page;
    this.getCurrentPage.emit(this.currentPage);
  }

  onPageSelected(page: number){
    if(page < 1 || page > this.limit()){
      return
    }
    this.selectPage(page);
  }

  onPreviousPage(){
    if(this.currentPage > 1){
      this.selectPage(this.currentPage - 1);
    }
  }

  onNextPage(){
    if(this.currentPage < this.limit()){
      this.selectPage(this.currentPage + 1);
    }
  }
  

  getButtonValue(offset: number): number {
    if(this.currentPage <= 2) {
      return 2 + offset;
    }

    if(this.limit() === 3 && this.currentPage === 3) { // fix for when there are only 3 pages
     return  2 + offset;
    }

    if(this.currentPage >= this.limit() - 1) { // if current page is the second to last page or last page
      return (this.limit() - 2) + offset;
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
    if(this.limit() >= 3) {
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
    if(pageNumber > this.limit() || pageNumber < 1 || isNaN(pageNumber)) {
      this.showPageSelectorError();
      return 
    }
    this.selectPage(pageNumber);
    this.onClosePageSelector();
  }
  
  // prevent user from entering numbers greater than the last page in the input
  onPageSelectorInputChange(value: string, inputElement: HTMLInputElement) {
    const inputValue = parseInt(value, 10);

    if (isNaN(inputValue)) {
      this.pageSelectorInputValue = value;
      return;
    }

    if(inputValue > this.limit()) {
      this.pageSelectorInputValue = this.limit().toString();
      inputElement.value = this.limit().toString(); // update input value to last page number
    } else {
      this.pageSelectorInputValue = value; // update to allowed value

      if(this.pageSelectorError) {
        this.hideShowPageSelectorError();
      }
    }
  }

}
