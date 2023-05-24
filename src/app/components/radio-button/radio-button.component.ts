import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RadioButtonModule]
})
export class RadioButtonComponent{

    @Input() value!: any;
    @Input() control!: any;
    @Input() inputId!: any;
    @Input() selectedValue!: any;
    @Input() isDisabled: boolean = false;
    @Output() onClick: any = new EventEmitter();


    onButtonClick = () => {      
      this.onClick.emit(this.selectedValue);
    };
}
