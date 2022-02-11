import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraCreateComponent } from './operadora-create.component';

describe('OperadoraCreateComponent', () => {
  let component: OperadoraCreateComponent;
  let fixture: ComponentFixture<OperadoraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
