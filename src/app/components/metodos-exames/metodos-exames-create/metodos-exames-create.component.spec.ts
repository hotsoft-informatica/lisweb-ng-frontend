import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosExamesCreateComponent } from './metodos-exames-create.component';

describe('MetodosExamesCreateComponent', () => {
  let component: MetodosExamesCreateComponent;
  let fixture: ComponentFixture<MetodosExamesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodosExamesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosExamesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
