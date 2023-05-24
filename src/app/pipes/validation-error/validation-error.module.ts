import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorPipe } from './validation-error.pipe';



@NgModule({
  declarations: [
    ValidationErrorPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ValidationErrorPipe]
})
export class ValidationErrorModule { }
