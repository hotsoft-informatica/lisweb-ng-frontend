import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgSenhaComponent } from './lg-senha.component';

describe('LgSenhaComponent', () => {
  let component: LgSenhaComponent;
  let fixture: ComponentFixture<LgSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
