import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoEnderecoComponent } from './local-de-atendimento-endereco.component';

describe('LocalDeAtendimentoEnderecoComponent', () => {
  let component: LocalDeAtendimentoEnderecoComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
