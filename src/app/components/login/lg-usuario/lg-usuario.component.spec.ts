import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgUsuarioComponent } from './lg-usuario.component';

describe('LgUsuarioComponent', () => {
  let component: LgUsuarioComponent;
  let fixture: ComponentFixture<LgUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
