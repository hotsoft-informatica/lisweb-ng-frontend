import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioCreateComponent } from './laboratorio-create.component';

describe('LaboratorioCreateComponent', () => {
  let component: LaboratorioCreateComponent;
  let fixture: ComponentFixture<LaboratorioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
