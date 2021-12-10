import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameAmostraReadComponent } from './exame-amostra-read.component';

describe('ExameAmostraReadComponent', () => {
  let component: ExameAmostraReadComponent;
  let fixture: ComponentFixture<ExameAmostraReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameAmostraReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameAmostraReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
