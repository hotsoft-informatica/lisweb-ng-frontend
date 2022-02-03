import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoEmpresaComponent } from './local-de-atendimento-empresa.component';

describe('LocalDeAtendimentoEmpresaComponent', () => {
  let component: LocalDeAtendimentoEmpresaComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
