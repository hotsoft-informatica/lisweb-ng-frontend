import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetorDeleteComponent } from './coletor-delete.component';

describe('ColetorDeleteComponent', () => {
  let component: ColetorDeleteComponent;
  let fixture: ComponentFixture<ColetorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColetorDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
