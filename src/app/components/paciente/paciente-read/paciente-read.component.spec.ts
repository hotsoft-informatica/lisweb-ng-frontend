import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteReadComponent } from './paciente-read.component';

describe('PacienteReadComponent', () => {
  let component: PacienteReadComponent;
  let fixture: ComponentFixture<PacienteReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
