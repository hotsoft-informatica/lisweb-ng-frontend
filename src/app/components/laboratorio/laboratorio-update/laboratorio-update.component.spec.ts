import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioUpdateComponent } from './laboratorio-update.component';

describe('LaboratorioUpdateComponent', () => {
  let component: LaboratorioUpdateComponent;
  let fixture: ComponentFixture<LaboratorioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
