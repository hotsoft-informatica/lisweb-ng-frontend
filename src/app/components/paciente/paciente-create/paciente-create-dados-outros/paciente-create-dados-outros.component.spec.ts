import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreateDadosOutrosComponent } from './paciente-create-dados-outros.component';

describe('PacienteCreateDadosOutrosComponent', () => {
  let component: PacienteCreateDadosOutrosComponent;
  let fixture: ComponentFixture<PacienteCreateDadosOutrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCreateDadosOutrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCreateDadosOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
