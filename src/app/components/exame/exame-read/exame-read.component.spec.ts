import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameReadComponent } from './exame-read.component';

describe('ExameReadComponent', () => {
  let component: ExameReadComponent;
  let fixture: ComponentFixture<ExameReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
