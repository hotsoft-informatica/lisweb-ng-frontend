import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoCrudComponent } from './responsavel-tecnico-crud.component';

describe('ResponsavelTecnicoCrudComponent', () => {
  let component: ResponsavelTecnicoCrudComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
