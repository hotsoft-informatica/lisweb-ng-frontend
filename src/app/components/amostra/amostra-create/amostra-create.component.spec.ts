import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraCreateComponent } from './amostra-create.component';

describe('AmostraCreateComponent', () => {
  let component: AmostraCreateComponent;
  let fixture: ComponentFixture<AmostraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmostraCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
