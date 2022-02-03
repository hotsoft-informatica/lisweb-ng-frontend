import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoCrudComponent } from './requisicao-crud.component';

describe('RequisicaoCrudComponent', () => {
  let component: RequisicaoCrudComponent;
  let fixture: ComponentFixture<RequisicaoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicaoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
