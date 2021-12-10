import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameUpdateComponent } from './exame-update.component';

describe('ExameUpdateComponent', () => {
  let component: ExameUpdateComponent;
  let fixture: ComponentFixture<ExameUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
