import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoCreateComponent } from './responsavel-tecnico-create.component';

describe('ResponsavelTecnicoCreateComponent', () => {
  let component: ResponsavelTecnicoCreateComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
