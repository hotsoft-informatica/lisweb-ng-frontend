import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreateDadosEnderecoComponent } from './paciente-create-dados-endereco.component';

describe('PacienteCreateDadosEnderecoComponent', () => {
  let component: PacienteCreateDadosEnderecoComponent;
  let fixture: ComponentFixture<PacienteCreateDadosEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCreateDadosEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCreateDadosEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
