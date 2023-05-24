import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorModule } from 'src/app/pipes/validation-error/validation-error.module';

@Component({
  selector: 'app-mat-input',
  templateUrl: './mat-input.component.html',
  styleUrls: ['./mat-input.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, ValidationErrorModule]
})
export class MatInputComponent {
    @Input() label!: string;
    @Input() type!: string;
    @Input() placeholder!: string;
    @Input() prefix!: string;
    @Input() control!: any;
    @Input() value!: any;
}
