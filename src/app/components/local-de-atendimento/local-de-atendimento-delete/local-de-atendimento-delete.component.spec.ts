import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoDeleteComponent } from './local-de-atendimento-delete.component';

describe('LocalDeAtendimentoDeleteComponent', () => {
  let component: LocalDeAtendimentoDeleteComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
