import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaCreateComponent } from './bandeja-create.component';

describe('BandejaCreateComponent', () => {
  let component: BandejaCreateComponent;
  let fixture: ComponentFixture<BandejaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
