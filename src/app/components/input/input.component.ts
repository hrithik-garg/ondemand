import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorModule } from 'src/app/pipes/validation-error/validation-error.module';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorModule]
})
export class InputComponent {

  @Input() control: any = new FormControl('');
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type!: string;
  @Input() value!: string | number;
  @Input() inputType!: string;
  @Input() showIcon!: boolean;
  @Input() iconClass!: string;
  @Input() styleCls!: string;
  @Input() iconStyleCls!: string;
  @Input() iconPositionClass: string = "p-input-icon-right";;
  @Output() onKeyPress: EventEmitter<any> = new EventEmitter();

  onKeyUp = (event: any) => {
    this.onKeyPress.emit(event);
  }
}
