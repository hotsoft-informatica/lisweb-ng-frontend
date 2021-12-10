import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoUpdateComponent } from './requisicao-update.component';

describe('RequisicaoUpdateComponent', () => {
  let component: RequisicaoUpdateComponent;
  let fixture: ComponentFixture<RequisicaoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicaoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
