import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaShowComponent } from './empresa-show.component';

describe('EmpresaShowComponent', () => {
  let component: EmpresaShowComponent;
  let fixture: ComponentFixture<EmpresaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
