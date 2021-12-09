import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetorCreateComponent } from './coletor-create.component';

describe('ColetorCreateComponent', () => {
  let component: ColetorCreateComponent;
  let fixture: ComponentFixture<ColetorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColetorCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
