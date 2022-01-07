import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaUpdateComponent } from './empresa-update.component';

describe('EmpresaUpdateComponent', () => {
  let component: EmpresaUpdateComponent;
  let fixture: ComponentFixture<EmpresaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
