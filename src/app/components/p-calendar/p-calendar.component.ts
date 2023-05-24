import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorModule } from 'src/app/pipes/validation-error/validation-error.module';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-p-calendar',
  templateUrl: './p-calendar.component.html',
  styleUrls: ['./p-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, InputTextModule, CalendarModule, ValidationErrorModule, FormsModule, ReactiveFormsModule, MessageModule]
})
export class PCalendarComponent {
  
  @Input() public label!: string;
  @Input() public cls!: string;
  @Input() public inputId!: string;
  @Input() public timeOnly!: boolean;
  @Input() control!: any;
  @Input() name!: any;
  @Input() minDate!: any;

}
