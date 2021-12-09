import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAmostraReadComponent } from './lote-amostra-read.component';

describe('LoteAmostraReadComponent', () => {
  let component: LoteAmostraReadComponent;
  let fixture: ComponentFixture<LoteAmostraReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteAmostraReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteAmostraReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
