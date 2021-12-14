import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancadaReadComponent } from './bancada-read.component';

describe('BancadaReadComponent', () => {
  let component: BancadaReadComponent;
  let fixture: ComponentFixture<BancadaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancadaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancadaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
