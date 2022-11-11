import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgUserComponent } from './lg-user.component';

describe('LgUserComponent', () => {
  let component: LgUserComponent;
  let fixture: ComponentFixture<LgUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
