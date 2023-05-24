import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfScheduleComponent } from './pdf-schedule.component';

describe('PdfScheduleComponent', () => {
  let component: PdfScheduleComponent;
  let fixture: ComponentFixture<PdfScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
