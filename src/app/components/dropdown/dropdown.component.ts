import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule]
})
export class DropdownComponent {
    @Input() dataList: any = [];
    @Input() value: any;
    @Input() placeholder!: string;
}
