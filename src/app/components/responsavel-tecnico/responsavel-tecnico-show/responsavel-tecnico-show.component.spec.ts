import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoShowComponent } from './responsavel-tecnico-show.component';

describe('ResponsavelTecnicoShowComponent', () => {
  let component: ResponsavelTecnicoShowComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelTecnicoShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelTecnicoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
