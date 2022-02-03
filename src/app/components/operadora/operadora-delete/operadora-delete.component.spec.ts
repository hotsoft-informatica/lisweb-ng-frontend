import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraDeleteComponent } from './operadora-delete.component';

describe('OperadoraDeleteComponent', () => {
  let component: OperadoraDeleteComponent;
  let fixture: ComponentFixture<OperadoraDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
