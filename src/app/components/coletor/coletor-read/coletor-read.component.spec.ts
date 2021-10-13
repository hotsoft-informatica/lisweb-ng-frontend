import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetorReadComponent } from './coletor-read.component';

describe('ColetorReadComponent', () => {
  let component: ColetorReadComponent;
  let fixture: ComponentFixture<ColetorReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColetorReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetorReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
