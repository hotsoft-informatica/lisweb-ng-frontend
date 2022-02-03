import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaReadComponent } from './empresa-read.component';

describe('EmpresaReadComponent', () => {
  let component: EmpresaReadComponent;
  let fixture: ComponentFixture<EmpresaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
