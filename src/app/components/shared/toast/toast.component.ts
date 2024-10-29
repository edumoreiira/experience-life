import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Toast } from '../../../models/toast.interface';
import { ToastService } from '../../../services/ui/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

const toastAnimation = trigger('toastAnimation', [
  state('void', style({
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    height: 0,
    minHeight: 0,
    opacity: 0
  })),
  transition(':enter', [
    animate('250ms ease-in-out')
  ]),
  transition(':leave', [
    animate('150ms ease-in', style( {
      transform: 'translateX(100%)',
      opacity: 0,
    })),
    animate('150ms ease-out', style({
      height: 0,
      minHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0
    }))
  ])
])

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [toastAnimation]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  private timeoutIds: { [key: string]: any } = {}; // object to store toast timeouts based on toast id

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.getToasts().subscribe({
      next: newToast => {
        newToast.isVisible = true;
        this.toasts.push(newToast);
        this.startDismissTimer(newToast);
      }
    })
  }

  private startDismissTimer(toast: Toast) {
    const duration = toast.duration || 3000;
    this.timeoutIds[toast.id!] = setTimeout(() => {
      toast.isVisible = false; // sets the toast to invisible to trigger the animation
      setTimeout(() => {
        this.removeToast(toast);
      }, 300); // removes from array after animation is complete
    }, duration);
  }

  removeToast(toast: Toast) {
    const newToastArray = this.toasts.filter(value => value.id !== toast.id); // creates a new toastArray excluding selected toasted parameter
    this.toasts = newToastArray;
  }

  pauseToast(toast: Toast) {
    clearTimeout(this.timeoutIds[toast.id!]); // clears the timeout for the selected toast
  }

  resumeToast(toast: Toast) {
    this.startDismissTimer(toast);
  }
}
