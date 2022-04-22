import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoUploadComponent } from './responsavel-tecnico-upload.component';

describe('ResponsavelTecnicoUploadComponent', () => {
  let component: ResponsavelTecnicoUploadComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
