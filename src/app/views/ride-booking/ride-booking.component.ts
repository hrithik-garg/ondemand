import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { VerifyUserComponent } from '../verify-user/verify-user.component';
import { StopsSelectionComponent } from './components/stops-selection/stops-selection.component';
import { CommonService } from 'src/app/services/common.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DescriptionComponent } from 'src/app/components/description/description.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StorageService } from 'src/app/services/storage.service';
import { MapService } from 'src/app/services/map.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ride-booking',
  templateUrl: './ride-booking.component.html',
  styleUrls: ['./ride-booking.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, HeadingComponent, VerifyUserComponent, StopsSelectionComponent, MapComponent, TranslateModule, DescriptionComponent],
  providers: [DialogService]
})
export class RideBookingComponent implements OnInit {

  @ViewChild('signOutTemplate', { static: true })
  signOutTemplate!: TemplateRef<ElementRef>;
  isUserVerified: boolean = false;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  selectedCommunity!: string;
  isProcessStarted: boolean = false;
  ref!: DynamicDialogRef;
  map: any;
  modalSecondBtn = this.translateService.instant('confirm');
  communityData!: any;
  latitude!: number;
  longitude!: number;

  constructor(private commonService: CommonService,
    private dialogService: DialogService, private translateService: TranslateService, private storageService: StorageService, private mapService: MapService) { }

  ngOnInit(): void {
    this.getMapControl();
    this.commonService.isUserVerified.subscribe((res) => {
      this.isUserVerified = res;
      this.getUserDetails();
    })
    this.commonService.selectedCommunity.subscribe((res) => {
      this.setValues();
    })
    this.commonService.isProcessStarted.subscribe((res) => {
      this.isProcessStarted = res;
    })
    this.getUserDetails();
    this.setValues();
  }

  setValues() {    
    this.communityData = this.storageService.getValueFromLocalStorage('communityData');
    this.selectedCommunity = this.communityData?.Name;
  }

  getMapControl() {
    this.mapService.getMap().pipe(debounceTime(1000)).subscribe((map: google.maps.Map) => {
      this.map = map;
      this.addFocusOnMap();
    });
  }

  addFocusOnMap() {
    let lat = this.communityData.Latitude;
    let lng = this.communityData.Longitude;
    let markerOptions: google.maps.MarkerOptions = {
      position: new google.maps.LatLng(lat, lng)
    };
    this.mapService.addFocusOnMap(this.map, markerOptions, 14);
  }

  getUserDetails() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    if (user) {
      this.isUserVerified = true;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phoneNumber = user.email;
    }
  }
  openCommunitiesModal() {
    let modalHeading = this.translateService.instant('areYouSure');
    let modalFirstBtn = this.translateService.instant('cancel');
    this.ref = this.dialogService.open(ModalComponent, {
      data: {
        contentTemplate: this.signOutTemplate,
        modalContentType: 'HtmlContent',
        firstBtnName: modalFirstBtn,
        secondBtnName: this.modalSecondBtn,
        firstBtnCls: 'gray-text-btn',
        secondBtnCls: 'comm-btn-highlight'
      },
      header: modalHeading
    });
    this.ref.onClose.subscribe((value : boolean) => {
      if (value) {
        localStorage.removeItem('user');
        localStorage.removeItem('MRAUid');
        this.commonService.notify(false);
      }
  });
  }

  onCancelRide() {
    let modalTxt = this.translateService.instant('rideCancelModalHeading');
    let modalHeading = this.translateService.instant('cancelRideRequest');
    let modalFirstBtn = this.translateService.instant('deny');
    this.ref = this.dialogService.open(ModalComponent, {
      data: {
        contentString: modalTxt,
        modalContentType: 'StringContent',
        firstBtnName: modalFirstBtn,
        secondBtnName: this.modalSecondBtn,
        firstBtnCls: 'gray-text-btn',
        secondBtnCls: 'deny-btn'
      },
      header: modalHeading,
      width: '24.6875rem'
    });
    this.ref.onClose.subscribe((value : boolean) => {
      if (value) {
        this.commonService.notifyProcessStarted(false);
        this.isProcessStarted = false;
      }
  });
  }

}
