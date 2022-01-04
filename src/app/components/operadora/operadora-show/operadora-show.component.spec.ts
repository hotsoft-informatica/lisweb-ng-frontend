import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraShowComponent } from './operadora-show.component';

describe('OperadoraShowComponent', () => {
  let component: OperadoraShowComponent;
  let fixture: ComponentFixture<OperadoraShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
