import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoHorarioFuncionamentoComponent } from './local-de-atendimento-horario-funcionamento.component';

describe('LocalDeAtendimentoHorarioFuncionamentoComponent', () => {
  let component: LocalDeAtendimentoHorarioFuncionamentoComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoHorarioFuncionamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoHorarioFuncionamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoHorarioFuncionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
