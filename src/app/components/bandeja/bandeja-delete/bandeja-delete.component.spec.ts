import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaDeleteComponent } from './bandeja-delete.component';

describe('BandejaDeleteComponent', () => {
  let component: BandejaDeleteComponent;
  let fixture: ComponentFixture<BandejaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
