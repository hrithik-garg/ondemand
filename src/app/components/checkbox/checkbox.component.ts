import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule]
})
export class CheckboxComponent {
  
    @Input() control!: any;
    @Input() inputId!: string;

}
