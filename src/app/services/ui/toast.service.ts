import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from '../../models/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSubject = new Subject<Toast>();
  toastId = 0;

  create(toast: Toast) {
    const newToast = toast;
    newToast.id = this.toastId++; // assigns a unique id to each toast
    this.toastSubject.next(newToast);
  }

  getToasts(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }
}
