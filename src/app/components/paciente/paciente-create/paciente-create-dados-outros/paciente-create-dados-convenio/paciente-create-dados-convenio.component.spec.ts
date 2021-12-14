import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreateDadosConvenioComponent } from './paciente-create-dados-convenio.component';

describe('PacienteCreateDadosConvenioComponent', () => {
  let component: PacienteCreateDadosConvenioComponent;
  let fixture: ComponentFixture<PacienteCreateDadosConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCreateDadosConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCreateDadosConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
