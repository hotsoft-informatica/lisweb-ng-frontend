import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameDeleteComponent } from './exame-delete.component';

describe('ExameDeleteComponent', () => {
  let component: ExameDeleteComponent;
  let fixture: ComponentFixture<ExameDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
