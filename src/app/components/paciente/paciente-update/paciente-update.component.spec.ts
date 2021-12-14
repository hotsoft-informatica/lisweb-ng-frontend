import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteUpdateComponent } from './paciente-update.component';

describe('PacienteUpdateComponent', () => {
  let component: PacienteUpdateComponent;
  let fixture: ComponentFixture<PacienteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
