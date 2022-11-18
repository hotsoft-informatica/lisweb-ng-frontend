import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteTipoInterfaceamentoComponent } from './autocomplete-tipo-interfaceamento.component';

describe('AutocompleteTipoInterfaceamentoComponent', () => {
  let component: AutocompleteTipoInterfaceamentoComponent;
  let fixture: ComponentFixture<AutocompleteTipoInterfaceamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteTipoInterfaceamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteTipoInterfaceamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
