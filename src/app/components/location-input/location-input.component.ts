import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorModule } from 'src/app/pipes/validation-error/validation-error.module';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, GooglePlaceModule, ValidationErrorModule, FormsModule, ReactiveFormsModule]
})
export class LocationInputComponent implements OnInit{

  @Input() label!: string;
  @Input() placeholder!: string;
  @Output() onAddressSelected: EventEmitter<any> = new EventEmitter();
  @Output() onEditLocation: EventEmitter<any> = new EventEmitter();
  @Input() control!: any;
  address!: any;
  isEditable: boolean = false;

  ngOnInit(): void {
    this.showEditBtn();
  }
  getAddress(address: any) {
    this.address = address;
    this.control.disable()
    this.onAddressSelected.emit(address);
  }
  editLocation() {
    this.control.enable();
    this.onEditLocation.emit(this.address);
  }
  showEditBtn() {    
    if(this.control.value){
      this.isEditable = true;
      this.control.disable();
    }
  }
  notShowEditBtn(){
    this.isEditable = false;
  }
}
