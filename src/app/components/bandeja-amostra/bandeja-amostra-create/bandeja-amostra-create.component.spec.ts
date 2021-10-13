import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAmostraCreateComponent } from './bandeja-amostra-create.component';

describe('BandejaAmostraCreateComponent', () => {
  let component: BandejaAmostraCreateComponent;
  let fixture: ComponentFixture<BandejaAmostraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaAmostraCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaAmostraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
