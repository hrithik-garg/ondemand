import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedRideResultsComponent } from './requested-ride-results.component';

describe('RequestedRideResultsComponent', () => {
  let component: RequestedRideResultsComponent;
  let fixture: ComponentFixture<RequestedRideResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedRideResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedRideResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
