import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-pdf-schedule',
  templateUrl: './pdf-schedule.component.html',
  styleUrls: ['./pdf-schedule.component.scss'],
  standalone: true,
  imports: [CommonModule, HeadingComponent, DropdownComponent, ButtonComponent, TranslateModule]
})
export class PdfScheduleComponent{

  isCommunitySelected: boolean = false;

}
