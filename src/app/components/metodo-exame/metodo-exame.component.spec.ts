import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoExameComponent } from './metodo-exame.component';

describe('MetodoExameComponent', () => {
  let component: MetodoExameComponent;
  let fixture: ComponentFixture<MetodoExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoExameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
