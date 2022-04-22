import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoReadComponent } from './responsavel-tecnico-read.component';

describe('ResponsavelTecnicoReadComponent', () => {
  let component: ResponsavelTecnicoReadComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
