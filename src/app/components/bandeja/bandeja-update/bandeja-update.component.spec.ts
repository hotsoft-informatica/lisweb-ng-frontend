import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaUpdateComponent } from './bandeja-update.component';

describe('BandejaUpdateComponent', () => {
  let component: BandejaUpdateComponent;
  let fixture: ComponentFixture<BandejaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
