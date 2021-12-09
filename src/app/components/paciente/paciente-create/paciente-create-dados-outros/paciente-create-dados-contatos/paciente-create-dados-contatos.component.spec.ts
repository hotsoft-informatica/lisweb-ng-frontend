import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreateDadosContatosComponent } from './paciente-create-dados-contatos.component';

describe('PacienteCreateDadosContatosComponent', () => {
  let component: PacienteCreateDadosContatosComponent;
  let fixture: ComponentFixture<PacienteCreateDadosContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCreateDadosContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCreateDadosContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
