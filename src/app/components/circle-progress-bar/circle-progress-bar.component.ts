import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input } from '@angular/core';

type progressValues = [number, number];
@Component({
  selector: 'app-circle-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle-progress-bar.component.html',
  styleUrl: './circle-progress-bar.component.scss'
})
export class CircleProgressBarComponent implements AfterViewInit{
  values = input<progressValues>([1,2]);
  insideText = input<string>('50');
  title = input<string>('Title');

  percentage: number = 0;
  
  get strokeDashOffset(): string {
    return `calc(128 - (128 * ${this.percentage}) / 100)`;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculatePercentage();
    });
  }

  calculatePercentage(): void {
    this.percentage = this.values()[0] / this.values()[1] * 100;
  }

}
