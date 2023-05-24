import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {InputTextModule} from 'primeng/inputtext'
import { TranslateModule } from '@ngx-translate/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ValidationErrorModule } from 'src/app/pipes/validation-error/validation-error.module';

@Component({
  selector: 'app-mobile-no-input',
  templateUrl: './mobile-no-input.component.html',
  styleUrls: ['./mobile-no-input.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule,
     FormsModule, Ng2TelInputModule, ValidationErrorModule, InputTextModule]
})
export class MobileNoInputComponent{

    countryCode: string = "+49";
    @Input() control!: any;
    @Input() label!: string;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    onCountryChange(event: any){
      this.countryCode = "+" + event.dialCode;
      this.onChange.emit({"countryCode": this.countryCode});
    }
}
