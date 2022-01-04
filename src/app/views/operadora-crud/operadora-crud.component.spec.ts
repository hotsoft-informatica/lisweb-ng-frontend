import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraCrudComponent } from './operadora-crud.component';

describe('OperadoraCrudComponent', () => {
  let component: OperadoraCrudComponent;
  let fixture: ComponentFixture<OperadoraCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
