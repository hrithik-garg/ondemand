import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { regexList } from 'src/app/constants/constants';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, HeadingComponent, TranslateModule]
})
export class BannerComponent implements OnInit{
  
    isCommunitySelected: boolean = false;
    queryForm!: FormGroup;

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
      this.queryForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(regexList.email)]],
      })
    }

    submitEmail(){
      this.queryForm.markAllAsTouched();
    }
}
