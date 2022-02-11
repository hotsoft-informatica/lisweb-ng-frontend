import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoShowComponent } from './requisicao-show.component';

describe('RequisicaoShowComponent', () => {
  let component: RequisicaoShowComponent;
  let fixture: ComponentFixture<RequisicaoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicaoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
