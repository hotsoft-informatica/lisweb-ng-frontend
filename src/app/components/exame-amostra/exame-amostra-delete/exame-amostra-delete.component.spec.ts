import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameAmostraDeleteComponent } from './exame-amostra-delete.component';

describe('ExameAmostraDeleteComponent', () => {
  let component: ExameAmostraDeleteComponent;
  let fixture: ComponentFixture<ExameAmostraDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameAmostraDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameAmostraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
