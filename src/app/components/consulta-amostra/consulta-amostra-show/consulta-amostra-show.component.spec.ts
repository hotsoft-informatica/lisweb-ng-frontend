import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAmostraShowComponent } from './consulta-amostra-show.component';

describe('ConsultaAmostraShowComponent', () => {
  let component: ConsultaAmostraShowComponent;
  let fixture: ComponentFixture<ConsultaAmostraShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAmostraShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAmostraShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
