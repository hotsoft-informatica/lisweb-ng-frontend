import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDeleteComponent } from './empresa-delete.component';

describe('EmpresaDeleteComponent', () => {
  let component: EmpresaDeleteComponent;
  let fixture: ComponentFixture<EmpresaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
