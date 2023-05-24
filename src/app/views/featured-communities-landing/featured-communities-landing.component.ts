import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { CommonService } from 'src/app/services/common.service';
import { RideBookingComponent } from '../ride-booking/ride-booking.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { VerifyUserComponent } from '../verify-user/verify-user.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Table, TableModule } from "primeng/table";
import { HttpService } from 'src/app/services/http.service';
import { CommunityInterface } from 'src/app/constants/interfaces';
import { getActiveCommunities } from 'src/app/constants/apiConstants';
import { InputComponent } from 'src/app/components/input/input.component';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-featured-communities-landing',
  templateUrl: './featured-communities-landing.component.html',
  styleUrls: ['./featured-communities-landing.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, HeadingComponent, RideBookingComponent, MapComponent, VerifyUserComponent, TranslateModule, TableModule, InputComponent],
  providers: [DialogService]
})
export class FeaturedCommunitiesLandingComponent {

  @ViewChild(Table, { static: false }) routesTable!: Table;
  @ViewChild('showAllCommunityTemplate', { static: true })
  communitiesData!: CommunityInterface[];
  filteredCommunityData!: CommunityInterface[];
  searchInputForm!: FormGroup;
  numberOfCommunities!: number;
  visibleCommunitiesOnScreen: number = 4;
  selectedCommunityBtnIdx: number = 0;
  isCommunitySelected: boolean = false;
  screenSizevisibleCommunities: any = [
    { screenSize: 1400, visibleCommunities: 4 }
  ];
  ref!: DynamicDialogRef;
  isProcessStart: boolean = false;
  previousSelectedCommunityIndex!: number;
  selectedCommunity!: string;
  showAllCommunityTemplate!: TemplateRef<ElementRef>;

  constructor(private commonService: CommonService,
    private dialogService: DialogService,
    private httpService: HttpService,
    private router: Router,
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getActiveCommunitiesDetails();
    this.getvisibleCommunitiesCount();
    this.commonService.isProcessStarted.subscribe((res) => {
      this.isProcessStart = res
    });
    this.createForm();
  }
  
  createForm() {
    this.searchInputForm = this.formBuilder.group({
      searchInput: ['']
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getvisibleCommunitiesCount();
  }
  getvisibleCommunitiesCount() {
    this.screenSizevisibleCommunities.every((community: { screenSize: number; visibleCommunities: number; }) => {
      if (community.screenSize <= window.innerWidth) {
        this.visibleCommunitiesOnScreen = community.visibleCommunities;
        return false
      }
      else {
        return true;
      }
    });
  }

  showAllCommunityModal() {
    let modalHeading = this.translateService.instant('communitiesHeading');
    this.ref = this.dialogService.open(ModalComponent, {
      data: {
        contentTemplate: this.showAllCommunityTemplate,
        modalContentType: 'HtmlContent',
        firstBtnName: '',
        secondBtnName: '',
      },
      header: modalHeading + "(" + this.numberOfCommunities + ")",
      width: '24.6875rem',
      height: '30rem',
      styleClass: 'custom-header'
    });
    this.ref.onClose.subscribe((value: boolean) => {
      if (value) {
        this.ref.close();
      }
    });
  }

  filterData(event: any) {
    this.filteredCommunityData = this.communitiesData.filter(s => s.CommunityName.toLowerCase().includes(this.searchInputForm.controls['searchInput'].value));
  }

  trackByCommunityId(index: number, community: any){
    return community.id;
  }

  getActiveCommunitiesDetails() {
    this.httpService.getRequest(getActiveCommunities).subscribe((data) => {
      if (data.Status === "Success") {
        this.communitiesData = this.filteredCommunityData = data['Payload'];
        this.numberOfCommunities = this.communitiesData.length;
        this.commonService.notifySelectedCommunity(this.communitiesData[this.selectedCommunityBtnIdx]);
      }
    })
  }

  onCommunityClick(communityData: CommunityInterface, isModal?: boolean){
    this.router.navigate(['/community', communityData.CommunityId]);
    if(isModal){
      this.ref.close();
    }
  }
}
