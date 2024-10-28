import { Component } from '@angular/core';
import { ThousandSeparator } from '../../../pipes/currency-format.pipe';
import { CircleProgressBarComponent } from '../../../components/shared/circle-progress-bar/circle-progress-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ThousandSeparator, CircleProgressBarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  kills = 1225312;
  deaths = 523018;

  test2 = [1, 2, 3, 4, 5, 6];
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  skin = 230;

}
