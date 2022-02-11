import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraUpdateComponent } from './operadora-update.component';

describe('OperadoraUpdateComponent', () => {
  let component: OperadoraUpdateComponent;
  let fixture: ComponentFixture<OperadoraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
