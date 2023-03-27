import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryGetRuleComponent } from './laboratory-get-rule.component';

describe('LaboratoryGetRuleComponent', () => {
  let component: LaboratoryGetRuleComponent;
  let fixture: ComponentFixture<LaboratoryGetRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LaboratoryGetRuleComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryGetRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
