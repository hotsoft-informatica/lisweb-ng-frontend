import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraDeleteComponent } from './amostra-delete.component';

describe('AmostraDeleteComponent', () => {
  let component: AmostraDeleteComponent;
  let fixture: ComponentFixture<AmostraDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmostraDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
