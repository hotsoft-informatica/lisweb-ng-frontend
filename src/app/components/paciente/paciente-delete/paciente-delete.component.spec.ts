import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDeleteComponent } from './paciente-delete.component';

describe('PacienteDeleteComponent', () => {
  let component: PacienteDeleteComponent;
  let fixture: ComponentFixture<PacienteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
