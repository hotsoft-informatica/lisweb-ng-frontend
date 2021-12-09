import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAmostraUpdateComponent } from './lote-amostra-update.component';

describe('LoteAmostraUpdateComponent', () => {
  let component: LoteAmostraUpdateComponent;
  let fixture: ComponentFixture<LoteAmostraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteAmostraUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteAmostraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
