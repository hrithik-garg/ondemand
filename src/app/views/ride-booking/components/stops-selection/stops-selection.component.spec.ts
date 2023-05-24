import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsSelectionComponent } from './stops-selection.component';

describe('StopsSelectionComponent', () => {
  let component: StopsSelectionComponent;
  let fixture: ComponentFixture<StopsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
