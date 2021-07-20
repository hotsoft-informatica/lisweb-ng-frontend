import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioDeleteComponent } from './laboratorio-delete.component';

describe('LaboratorioDeleteComponent', () => {
  let component: LaboratorioDeleteComponent;
  let fixture: ComponentFixture<LaboratorioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
