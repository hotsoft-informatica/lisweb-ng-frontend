import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorReferenciaCreateComponent } from './valor-referencia-create.component';

describe('ValorReferenciaCreateComponent', () => {
  let component: ValorReferenciaCreateComponent;
  let fixture: ComponentFixture<ValorReferenciaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorReferenciaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorReferenciaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
