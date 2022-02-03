import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraReadComponent } from './operadora-read.component';

describe('OperadoraReadComponent', () => {
  let component: OperadoraReadComponent;
  let fixture: ComponentFixture<OperadoraReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
