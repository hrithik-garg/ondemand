import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, FormsModule, TranslateModule],
  providers: [DialogService]
})
export class ContactUsComponent {

  ref!: DynamicDialogRef;
  emailSubmitForm!: FormGroup;
  emailPlaceholder!: string;

  constructor(private dialogService: DialogService, private formBuilder: FormBuilder, private translateService: TranslateService) { }

    ngOnInit(): void {
      this.translateService.get('enterEmail').subscribe(res =>{
        this.emailPlaceholder = res
      })
      this.createForm();
     }
   
     createForm(){
       this.emailSubmitForm = this.formBuilder.group({
         email: ['', [Validators.required]]
       })
     }

     submitRequestModal() {
      if (this.emailSubmitForm.invalid) {
        let emailPlaceholderTxt = this.translateService.instant('emailPlaceholder');
        this.emailPlaceholder = emailPlaceholderTxt;
        this.emailSubmitForm.markAllAsTouched();
        return;
      }
      let contentTxt = this.translateService.instant('submitRequestModalPara');
      let modalHeading = this.translateService.instant('submitRequestHeading');
      let modalBtnName = this.translateService.instant('okay');
      this.ref = this.dialogService.open(ModalComponent, {
        data: {
          contentString: contentTxt,
          modalContentType: 'StringContent',
          secondBtnName: modalBtnName,
          secondBtnCls: 'comm-btn-highlight'
        },
        header: modalHeading,
        width: '24.6875rem'
      });
    }

}
