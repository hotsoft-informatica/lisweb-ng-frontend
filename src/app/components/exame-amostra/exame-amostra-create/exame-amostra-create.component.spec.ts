import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameAmostraCreateComponent } from './exame-amostra-create.component';

describe('ExameAmostraCreateComponent', () => {
  let component: ExameAmostraCreateComponent;
  let fixture: ComponentFixture<ExameAmostraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameAmostraCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameAmostraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
