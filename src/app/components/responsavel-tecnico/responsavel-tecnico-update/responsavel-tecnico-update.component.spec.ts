import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoUpdateComponent } from './responsavel-tecnico-update.component';

describe('ResponsavelTecnicoUpdateComponent', () => {
  let component: ResponsavelTecnicoUpdateComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
