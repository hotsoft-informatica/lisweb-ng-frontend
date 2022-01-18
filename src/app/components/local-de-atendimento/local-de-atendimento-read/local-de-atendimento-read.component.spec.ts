import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoReadComponent } from './local-de-atendimento-read.component';

describe('LocalDeAtendimentoReadComponent', () => {
  let component: LocalDeAtendimentoReadComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
