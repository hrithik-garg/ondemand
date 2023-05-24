import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getCommunityById } from 'src/app/constants/apiConstants';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { HeadingComponent } from '../heading/heading.component';
import { StorageService } from 'src/app/services/storage.service';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeadingComponent, ButtonComponent, TranslateModule]
})
export class HeaderComponent implements OnInit {
  communitiesData: any;
  communityId!: string;
  communitySelected!: boolean;
  communityName!: string;
  isMenuCollapsed: boolean = false;

  constructor(public translate: TranslateService, private httpService: HttpService,
              private activeRoute: ActivatedRoute, private commonService: CommonService, 
              private storageService: StorageService) {
              }
              
    ngOnInit() {
      this.translate.addLangs(['en', 'de']);
      this.translate.setDefaultLang('en');
      const queryParams = this.activeRoute.snapshot.params;
      if (queryParams['communityId']) {
        this.communityId = queryParams['communityId'];
        this.communitySelected = true;
        this.communitiesData = this.storageService.getValueFromLocalStorage('communityData');
        if (!this.communitiesData || this.communitiesData.Id != this.communityId) {
          this.getCommunityById();
        }
        else{
          this.setValues();
        }
      }
  }

  getCommunityById() {
    const url = getCommunityById + "/" + this.communityId;
    this.httpService.getRequest(url).subscribe((data) => {
      if (data.Status === "Success") {
        this.communitiesData = data.Payload[0];
        this.setValues();
        this.storageService.setValueInLocalStorage('communityData', this.communitiesData);
        this.commonService.notifySelectedCommunity(this.communitiesData);
      }
    })
  }
  setValues() {
    this.communityName = this.communitiesData.Name;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
