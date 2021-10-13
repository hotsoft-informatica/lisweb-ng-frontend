import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAmostraCreateComponent } from './lote-amostra-create.component';

describe('LoteAmostraCreateComponent', () => {
  let component: LoteAmostraCreateComponent;
  let fixture: ComponentFixture<LoteAmostraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteAmostraCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteAmostraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
