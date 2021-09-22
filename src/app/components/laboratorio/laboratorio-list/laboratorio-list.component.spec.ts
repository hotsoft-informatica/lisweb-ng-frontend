import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioListComponent } from './laboratorio-list.component';

describe('LaboratorioListComponent', () => {
  let component: LaboratorioListComponent;
  let fixture: ComponentFixture<LaboratorioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
