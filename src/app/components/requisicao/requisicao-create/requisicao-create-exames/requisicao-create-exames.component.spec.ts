import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoCreateExamesComponent } from './requisicao-create-exames.component';

describe('RequisicaoCreateExamesComponent', () => {
  let component: RequisicaoCreateExamesComponent;
  let fixture: ComponentFixture<RequisicaoCreateExamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoCreateExamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoCreateExamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
