import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraUpdateComponent } from './amostra-update.component';

describe('AmostraUpdateComponent', () => {
  let component: AmostraUpdateComponent;
  let fixture: ComponentFixture<AmostraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmostraUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
