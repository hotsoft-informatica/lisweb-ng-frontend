import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraReadComponent } from './amostra-read.component';

describe('AmostraReadComponent', () => {
  let component: AmostraReadComponent;
  let fixture: ComponentFixture<AmostraReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmostraReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
