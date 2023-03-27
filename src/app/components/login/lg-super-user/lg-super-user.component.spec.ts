import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgSuperUserComponent } from './lg-super-user.component';

describe('LgSuperUserComponent', () => {
  let component: LgSuperUserComponent;
  let fixture: ComponentFixture<LgSuperUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LgSuperUserComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LgSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
