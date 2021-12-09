import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaReadComponent } from './bandeja-read.component';

describe('BandejaReadComponent', () => {
  let component: BandejaReadComponent;
  let fixture: ComponentFixture<BandejaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
