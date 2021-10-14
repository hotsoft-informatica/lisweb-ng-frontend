import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoCreateComponent } from './requisicao-create.component';

describe('RequisicaoCreateComponent', () => {
  let component: RequisicaoCreateComponent;
  let fixture: ComponentFixture<RequisicaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
