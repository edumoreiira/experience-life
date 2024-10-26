import { Component, input, output } from '@angular/core';
import { ModalComponent, ModalSizeUnit } from "../modal/modal.component";
import { ButtonComponent } from '../button/button.component';
import { parentAnimations } from '../../animations/transition-animations';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  animations: [parentAnimations]
})
export class ConfirmationDialogComponent {
  title = input.required<string>();
  minWidth = input<ModalSizeUnit>('27em');
  message = input.required<string>();
  confirmText = input<string>('Confirmar');
  cancelText = input<string>('Cancelar');
  confirmationDialog = output<boolean>();

  onConfirm() {
    this.confirmationDialog.emit(true);
  }

  onCancel() {
    this.confirmationDialog.emit(false);
  }
  

}
