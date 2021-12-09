import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAmostraDeleteComponent } from './bandeja-amostra-delete.component';

describe('BandejaAmostraDeleteComponent', () => {
  let component: BandejaAmostraDeleteComponent;
  let fixture: ComponentFixture<BandejaAmostraDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaAmostraDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaAmostraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
