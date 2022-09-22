import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryPostRuleComponent } from './laboratory-post-rule.component';

describe('LaboratoryPostRuleComponent', () => {
  let component: LaboratoryPostRuleComponent;
  let fixture: ComponentFixture<LaboratoryPostRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryPostRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryPostRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
