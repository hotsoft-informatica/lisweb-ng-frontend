import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeAtendimentoUpdateComponent } from './local-de-atendimento-update.component';

describe('LocalDeAtendimentoUpdateComponent', () => {
  let component: LocalDeAtendimentoUpdateComponent;
  let fixture: ComponentFixture<LocalDeAtendimentoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeAtendimentoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeAtendimentoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
