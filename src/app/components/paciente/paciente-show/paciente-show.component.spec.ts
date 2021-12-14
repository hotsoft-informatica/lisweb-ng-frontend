import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteShowComponent } from './paciente-show.component';

describe('PacienteShowComponent', () => {
  let component: PacienteShowComponent;
  let fixture: ComponentFixture<PacienteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
