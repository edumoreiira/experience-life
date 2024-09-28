import { Component, HostBinding, input } from '@angular/core';
import { slideUpDown } from '../../animations/transition-animations';
import e from 'express';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [slideUpDown]
})
export class SidebarComponent {
  version = input.required<string>();
  isExpanded = false; // handle expanded state for mobile view
  
  @HostBinding('class.expanded') get applyExpandedClass() { //apply expanded on host
    return this.isExpanded;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  
  handleSelectedItem(event: Event) {
    const items = document.querySelectorAll('.sidebar__nav__item__option');
    const element = event.target as HTMLElement;


    items.forEach((item) => {
      item.classList.remove('sidebar__nav__item__option--selected');
    });
    element.classList.add('sidebar__nav__item__option--selected');
  }

  handleExpandOption(event: Event) {
    const targetElement = event.target as HTMLElement;
    
    targetElement.classList.toggle('sidebar__nav__item__option--expanded');
    
    if(this.isExpanded === false) {
      this.expandNav();
    }
  }

  expandNav() {
    const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
    sidebarElement.classList.remove('sidebar--collapsed');
    this.isExpanded = true;
    this.handleNavbarIcon();
  }

  collapseNav() {
    const expandedOptions = document.querySelectorAll('.sidebar__nav__item__option--expanded');
    expandedOptions.forEach((option) => {
      option.classList.remove('sidebar__nav__item__option--expanded');
    });

    const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
    sidebarElement.classList.add('sidebar--collapsed');
    this.isExpanded = false;
    this.handleNavbarIcon();
    
  }

  handleNav() {
    if(this.isExpanded === true) {
      this.collapseNav();
    } else {
      this.expandNav();
    }
  }
  handleNavbarIcon() {
    const navbarIcon = document.querySelector('#sidebarHandleIcon') as HTMLElement;
    if(navbarIcon.classList.contains('fi-br-arrows-from-line')) {
      navbarIcon.classList.remove('fi-br-arrows-from-line');
      navbarIcon.classList.add('fi-br-arrows-to-line');
    } else {
      navbarIcon.classList.remove('fi-br-arrows-to-line');
      navbarIcon.classList.add('fi-br-arrows-from-line');
    }
  }
  
}
