import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAmostraDeleteComponent } from './lote-amostra-delete.component';

describe('LoteAmostraDeleteComponent', () => {
  let component: LoteAmostraDeleteComponent;
  let fixture: ComponentFixture<LoteAmostraDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteAmostraDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteAmostraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
