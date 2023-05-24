import { Component } from '@angular/core';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss'],
  standalone: true,
  imports: [HeadingComponent, ButtonComponent, TranslateModule]
})
export class ScheduleCardComponent {

}
