import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAmostraUpdateComponent } from './bandeja-amostra-update.component';

describe('BandejaAmostraUpdateComponent', () => {
  let component: BandejaAmostraUpdateComponent;
  let fixture: ComponentFixture<BandejaAmostraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaAmostraUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaAmostraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
