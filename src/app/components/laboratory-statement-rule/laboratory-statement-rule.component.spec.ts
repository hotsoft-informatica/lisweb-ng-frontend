import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryStatementRuleComponent } from './laboratory-statement-rule.component';

describe('LaboratoryStatementRuleComponent', () => {
  let component: LaboratoryStatementRuleComponent;
  let fixture: ComponentFixture<LaboratoryStatementRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryStatementRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryStatementRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
