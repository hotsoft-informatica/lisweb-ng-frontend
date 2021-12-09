import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameCreateComponent } from './exame-create.component';

describe('ExameCreateComponent', () => {
  let component: ExameCreateComponent;
  let fixture: ComponentFixture<ExameCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExameCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
