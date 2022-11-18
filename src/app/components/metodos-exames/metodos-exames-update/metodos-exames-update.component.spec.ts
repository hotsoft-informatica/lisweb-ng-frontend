import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosExamesUpdateComponent } from './metodos-exames-update.component';

describe('MetodosExamesUpdateComponent', () => {
  let component: MetodosExamesUpdateComponent;
  let fixture: ComponentFixture<MetodosExamesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodosExamesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosExamesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
