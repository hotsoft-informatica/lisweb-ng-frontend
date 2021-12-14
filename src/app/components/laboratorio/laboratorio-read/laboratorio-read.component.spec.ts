import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioReadComponent } from './laboratorio-read.component';

describe('LaboratorioReadComponent', () => {
  let component: LaboratorioReadComponent;
  let fixture: ComponentFixture<LaboratorioReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
