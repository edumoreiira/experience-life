import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, input } from '@angular/core';
import { slide } from '../../animations/transition-animations';

@Component({
  selector: 'app-clipboard-copy',
  standalone: true,
  imports: [ClipboardModule],
  templateUrl: './clipboard-copy.component.html',
  styleUrl: './clipboard-copy.component.scss',
  animations: [slide]
})
export class ClipboardCopyComponent {
  copied = false;
  value = input<string>('text to be copied');
    // show/hide copied alert
    handleCopyIp() {
      if(this.copied === false) { // avoid multiple alerts
        this.copied = true;
  
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      }
    }
}
