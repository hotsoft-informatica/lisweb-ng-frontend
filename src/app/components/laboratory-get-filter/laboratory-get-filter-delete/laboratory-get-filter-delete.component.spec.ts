import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryGetFilterDeleteComponent } from './laboratory-get-filter-delete.component';

describe('LaboratoryGetFilterDeleteComponent', () => {
  let component: LaboratoryGetFilterDeleteComponent;
  let fixture: ComponentFixture<LaboratoryGetFilterDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryGetFilterDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryGetFilterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
