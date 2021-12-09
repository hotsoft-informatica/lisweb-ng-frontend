import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAmostraReadComponent } from './bandeja-amostra-read.component';

describe('BandejaAmostraReadComponent', () => {
  let component: BandejaAmostraReadComponent;
  let fixture: ComponentFixture<BandejaAmostraReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaAmostraReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaAmostraReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
