import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from '../../views/banner/banner.component';
import { BrandingComponent } from '../../views/branding/branding.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HomePageBannerComponent } from 'src/app/views/home-page-banner/home-page-banner.component';
import { InnovationSectionComponent } from 'src/app/views/innovation-section/innovation-section.component';
import { FeaturedCommunitiesLandingComponent } from 'src/app/views/featured-communities-landing/featured-communities-landing.component';
import { ContactUsComponent } from 'src/app/views/contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, BannerComponent, BrandingComponent, HeaderComponent, FooterComponent, HomePageBannerComponent, InnovationSectionComponent, FeaturedCommunitiesLandingComponent, ContactUsComponent]
})
export class HomeComponent {
    
}
