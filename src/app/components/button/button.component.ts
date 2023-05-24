import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonComponent{

    @Input() name!: string;
    @Input() cls!: string;
    @Input() ngcls!: string;
    @Input() disabled!: boolean;
    @Output() onClick: any = new EventEmitter();


    onButtonClick = () => {
      this.onClick.emit();
    };
}
