import { Component } from '@angular/core';
import { BannerComponent } from '../../views/banner/banner.component';
import { BrandingComponent } from '../../views/branding/branding.component';
import { PdfScheduleComponent } from '../../views/pdf-schedule/pdf-schedule.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RideBookingComponent } from 'src/app/views/ride-booking/ride-booking.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ScheduleCardComponent } from 'src/app/views/schedule-card/schedule-card.component';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  standalone: true,
  imports: [HeaderComponent, BannerComponent, BrandingComponent, PdfScheduleComponent, RideBookingComponent, FooterComponent, ScheduleCardComponent]
})
export class CommunityComponent {

}
