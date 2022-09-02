import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DominioComponent } from './dominio.component';

describe('DominioComponent', () => {
  let component: DominioComponent;
  let fixture: ComponentFixture<DominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DominioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
