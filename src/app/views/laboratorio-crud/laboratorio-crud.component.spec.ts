import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioCrudComponent } from './laboratorio-crud.component';

describe('LaboratorioCrudComponent', () => {
  let component: LaboratorioCrudComponent;
  let fixture: ComponentFixture<LaboratorioCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
