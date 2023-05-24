import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNoInputComponent } from './mobile-no-input.component';

describe('MobileNoInputComponent', () => {
  let component: MobileNoInputComponent;
  let fixture: ComponentFixture<MobileNoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileNoInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
