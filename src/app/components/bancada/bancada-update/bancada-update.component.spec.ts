import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancadaUpdateComponent } from './bancada-update.component';

describe('BancadaUpdateComponent', () => {
  let component: BancadaUpdateComponent;
  let fixture: ComponentFixture<BancadaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancadaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancadaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
