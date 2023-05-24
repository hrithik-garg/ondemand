import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedCommunitiesLandingComponent } from './featured-communities-landing.component';

describe('FeaturedCommunitiesLandingComponent', () => {
  let component: FeaturedCommunitiesLandingComponent;
  let fixture: ComponentFixture<FeaturedCommunitiesLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedCommunitiesLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedCommunitiesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
