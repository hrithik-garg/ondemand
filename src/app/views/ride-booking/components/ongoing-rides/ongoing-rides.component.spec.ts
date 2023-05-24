import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingRidesComponent } from './ongoing-rides.component';

describe('OngoingRidesComponent', () => {
  let component: OngoingRidesComponent;
  let fixture: ComponentFixture<OngoingRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingRidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
