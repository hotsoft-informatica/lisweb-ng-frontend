import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoCreateComponent } from './local-de-atendimento-create.component';

describe('LocalDeAtendimentoCreateComponent', () => {
  let component: LocalDeAtendimentoCreateComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
