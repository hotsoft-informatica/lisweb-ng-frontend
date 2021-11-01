import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreateDadosPessoaisComponent } from './paciente-create-dados-pessoais.component';

describe('PacienteCreateDadosPessoaisComponent', () => {
  let component: PacienteCreateDadosPessoaisComponent;
  let fixture: ComponentFixture<PacienteCreateDadosPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCreateDadosPessoaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCreateDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
