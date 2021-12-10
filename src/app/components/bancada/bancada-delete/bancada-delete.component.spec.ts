import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancadaDeleteComponent } from './bancada-delete.component';

describe('BancadaDeleteComponent', () => {
  let component: BancadaDeleteComponent;
  let fixture: ComponentFixture<BancadaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancadaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancadaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
