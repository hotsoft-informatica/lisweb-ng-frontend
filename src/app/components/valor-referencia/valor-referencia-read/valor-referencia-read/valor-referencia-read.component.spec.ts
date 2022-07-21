import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorReferenciaReadComponent } from './valor-referencia-read.component';

describe('ValorReferenciaReadComponent', () => {
  let component: ValorReferenciaReadComponent;
  let fixture: ComponentFixture<ValorReferenciaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorReferenciaReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorReferenciaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
