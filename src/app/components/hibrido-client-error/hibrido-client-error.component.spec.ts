import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HibridoClientErrorComponent } from './hibrido-client-error.component';

describe('HibridoClientErrorComponent', () => {
  let component: HibridoClientErrorComponent;
  let fixture: ComponentFixture<HibridoClientErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HibridoClientErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HibridoClientErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
