import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeadingComponent {
    @Input() text!: string;
    @Input() cls!: string;
    @Input() public headingType: string = '';
}
