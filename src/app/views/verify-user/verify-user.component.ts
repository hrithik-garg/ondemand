import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { DescriptionComponent } from 'src/app/components/description/description.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { MatInputComponent } from 'src/app/components/mat-input/mat-input.component';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MobileNoInputComponent } from 'src/app/components/mobile-no-input/mobile-no-input.component';
import { HttpService } from 'src/app/services/http.service';
import { generateOtpForRegisteredUserUrl, generateOtpForUnRegisteredUserUrl, getUserAccountDetailsUrl, registerFPTUserUrl, validateFPTUserUrl } from 'src/app/constants/apiConstants';
import { regexList } from 'src/app/constants/constants';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatInputComponent, HeadingComponent, InputComponent, DescriptionComponent, TranslateModule, FormsModule, MobileNoInputComponent, ReactiveFormsModule]
})
export class VerifyUserComponent implements OnInit{
  
    verifyForm!: FormGroup;
    isOtpSend: boolean = false;
    isUserNew: boolean = false;
    countryCode: string = "+49";
    token!: string;
    OTP!: string;

    constructor(private commonService: CommonService,
                private httpService: HttpService,
                private formBuilder: FormBuilder,
                private storageService: StorageService,
    ){ }

    ngOnInit(): void {
        this.verifyForm = this.formBuilder.group({
          mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(regexList.mobileNumber)]],
          otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]]
        })
    }
  
    get f() { return this.verifyForm.controls}

    generateOtpForRegisteredUser(){
      if(this.f['mobileNumber'].invalid){
        this.f['mobileNumber'].markAsTouched();
        return;
      }
      let body = {"phoneNumber": (this.countryCode + this.f['mobileNumber'].value)};
      this.httpService.postRequest(generateOtpForRegisteredUserUrl, body).subscribe((data) =>{
        if(data.Status === "Success"){
          this.isOtpSend = true;
        }
        else{
          this.generateOtpForUnRegisteredUser()
        }
      })      
    }

    validateRegisteredUser(){
      if(this.f['otp'].invalid){
        this.f['otp'].markAsTouched();
        return;
      }
      let body = {"phoneNumber": (this.countryCode + this.f['mobileNumber'].value), "otp": this.f['otp'].value};
      this.httpService.postRequest(validateFPTUserUrl, body).subscribe((data) =>{
        if(data.Status === "Success"){
          this.storageService.setValueInLocalStorage('MRAUid', data.Payload[0].token);
           this.getUserAccountDetails();
        }
      })
    }

    generateOtpForUnRegisteredUser(){
      let body = {"phoneNumber": (this.countryCode + this.f['mobileNumber'].value)};
      this.httpService.postRequest(generateOtpForUnRegisteredUserUrl, body).subscribe((data) =>{
        if(data.Status === "Success"){
          this.isOtpSend = true;
          this.isUserNew = true;
        }
      })      
    }

    registerNewUser(){
        if(this.verifyForm.invalid){
          this.verifyForm.markAllAsTouched();
          return;
        }
        let body = {"phoneNumber": (this.countryCode + this.f['mobileNumber'].value), "otp": this.f['otp'].value, "firstName": this.f['firstName'].value, "lastName": this.f['lastName'].value};
        this.httpService.postRequest(registerFPTUserUrl, body).subscribe((data) =>{
          if(data.Status === "Success"){
            const user = {'firstName': this.f['firstName'].value, 'lastName': this.f['lastName'].value, 'email': this.countryCode + this.f['mobileNumber'].value};
            this.storageService.setValueInLocalStorage('user', JSON.stringify(user));
            this.getUserAccountDetails();
            this.userVerified();
          }
        })
    }
   
    getUserAccountDetails(){
      const token = this.storageService.getValueFromLocalStorage('MRAUid');      
      this.httpService.getRequest(getUserAccountDetailsUrl, undefined, [{key: "token", value: token}]).subscribe((data) =>{
        if(data.Status === "Success"){
          const user = data['Payload'][0];
          localStorage.setItem('user', JSON.stringify(user));
          this.userVerified();
        }
      })      
    }

    userVerified(){
      this.commonService.notify(true);
    }
    changeCountryCode(event: any){
        this.countryCode = event.countryCode;
    }
}
