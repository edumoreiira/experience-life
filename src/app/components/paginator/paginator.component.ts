import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  lastPage = 10
  currentPage = 1
  secondToLastPage = this.lastPage - 1;
  showPageSelector = true;
  pageSelectorError = false;
  pageSelectorInputValue = '';

  onPageSelected(page: number){
    this.currentPage = page
  }

  onPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
    }
  }

  onNextPage(){
    if(this.currentPage < this.lastPage){
      this.currentPage++
    }
  }


  get firstButtonValue() {
    if(this.currentPage === this.lastPage) { // last page
      return this.currentPage - 3;
    } else if (this.currentPage === this.secondToLastPage) { // second to last page
      return this.currentPage - 2;
    }
    return this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
  }

  get secondButtonValue() {
    if(this.currentPage === this.lastPage) { 
      return this.currentPage - 2;
    } else if (this.currentPage === this.secondToLastPage) {
      return this.currentPage - 1;
    }
    return this.currentPage !== 1 ? this.currentPage : this.currentPage + 1;
  }

  get thirdButtonValue() {
    if(this.currentPage === this.lastPage) { 
      return this.currentPage - 1;
    } else if (this.currentPage === this.secondToLastPage) {
      return this.currentPage;
    }
    return this.currentPage !== 1 ? this.currentPage + 1 : this.currentPage + 2;
  }




  // Page Selector modal methods
  onClosePageSelector() {
    this.showPageSelector = false;
  }

  onOpenPageSelector() {
    this.showPageSelector = true;
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
    if(pageNumber > this.lastPage || pageNumber < 1 || isNaN(pageNumber)) {
      this.showPageSelectorError();
      return 
    }
    this.showPageSelector = false; // close page selector
    this.currentPage = pageNumber;
    this.pageSelectorInputValue = ''; // clear input value
  }
  
  // prevent user from entering numbers greater than the last page
  onPageSelectorInputChange(value: string, inputElement: HTMLInputElement) {
    const inputValue = parseInt(value, 10);

    if (isNaN(inputValue)) {
      this.pageSelectorInputValue = value;
      return;
    }

    if(inputValue > this.lastPage) {
      this.pageSelectorInputValue = this.lastPage.toString();
      inputElement.value = this.lastPage.toString(); // update input value to last page number
    } else {
      this.pageSelectorInputValue = value; // update to allowed value

      if(this.pageSelectorError) {
        this.hideShowPageSelectorError();
      }
    }
  }

}
