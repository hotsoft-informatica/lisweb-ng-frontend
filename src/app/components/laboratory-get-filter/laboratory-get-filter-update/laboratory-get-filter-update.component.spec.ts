import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryGetFilterUpdateComponent } from './laboratory-get-filter-update.component';

describe('LaboratoryGetFilterUpdateComponent', () => {
  let component: LaboratoryGetFilterUpdateComponent;
  let fixture: ComponentFixture<LaboratoryGetFilterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryGetFilterUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryGetFilterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
