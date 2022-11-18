import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosExamesDeleteComponent } from './metodos-exames-delete.component';

describe('MetodosExamesDeleteComponent', () => {
  let component: MetodosExamesDeleteComponent;
  let fixture: ComponentFixture<MetodosExamesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodosExamesDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosExamesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
