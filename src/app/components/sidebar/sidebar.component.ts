import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  version = input.required<string>();
  handleSelectedItem(event: Event) {
    const items = document.querySelectorAll('.sidebar__itens__item');
    const element = event.target as HTMLElement;

    items.forEach((item) => {
      item.classList.remove('sidebar__itens__item--selected');
    });
    element.classList.add('sidebar__itens__item--selected');
  }
}
