import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancadaCreateComponent } from './bancada-create.component';

describe('BancadaCreateComponent', () => {
  let component: BancadaCreateComponent;
  let fixture: ComponentFixture<BancadaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancadaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancadaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
