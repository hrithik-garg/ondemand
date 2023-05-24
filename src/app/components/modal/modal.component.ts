import { AfterViewInit, Component, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { ModalContentType } from 'src/app/constants/constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [DialogModule, ButtonComponent, CommonModule, DynamicDialogModule, TranslateModule]
})
export class ModalComponent implements OnInit, AfterViewInit {

  firstBtnName!: string;
  secondBtnName!: string;
  firstBtnCls!: string;
  secondBtnCls!: string;
  modalContentType!: ModalContentType;
  contentTemplate!: TemplateRef<any>;
  contentString!: string;
  componentName!: Type<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  dynamicComponent!: ViewContainerRef;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.firstBtnName = this.config.data.firstBtnName;
    this.secondBtnName = this.config.data.secondBtnName;
    this.firstBtnCls = this.config.data.firstBtnCls;
    this.secondBtnCls = this.config.data.secondBtnCls;
    this.modalContentType = this.config?.data.modalContentType;
    this.contentTemplate = this.config?.data?.contentTemplate;
    this.contentString = this.config?.data?.contentString;
    this.componentName = this.config?.data?.componentName;
  }

  closeModal(value: boolean) {
    this.ref.close(value);
  }
  ngAfterViewInit(): void {
    this.loadComponent();
  }

  loadComponent = () => {
    if (this.modalContentType == ModalContentType.DynamicComponent) {
      this.dynamicComponent.clear();
      this.dynamicComponent.createComponent(this.componentName);
    }
  }
}
