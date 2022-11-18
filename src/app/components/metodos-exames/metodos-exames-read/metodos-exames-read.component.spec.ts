import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosExamesReadComponent } from './metodos-exames-read.component';

describe('MetodosExamesReadComponent', () => {
  let component: MetodosExamesReadComponent;
  let fixture: ComponentFixture<MetodosExamesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodosExamesReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosExamesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
