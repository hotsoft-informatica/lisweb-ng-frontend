import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratoryDomainCreateComponent } from './laboratory-domain-create.component';

describe('LaboratoryDomainCreateComponent', () => {
  let component: LaboratoryDomainCreateComponent;
  let fixture: ComponentFixture<LaboratoryDomainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryDomainCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryDomainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
