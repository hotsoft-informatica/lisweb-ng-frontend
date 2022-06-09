import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErroAutenticacaoComponent } from './dialog-erro-autenticacao.component';

describe('DialogErroAutenticacaoComponent', () => {
  let component: DialogErroAutenticacaoComponent;
  let fixture: ComponentFixture<DialogErroAutenticacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErroAutenticacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErroAutenticacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
