import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExameReadComponent } from './tipo-exame-read.component';

describe('TipoExameReadComponent', () => {
  let component: TipoExameReadComponent;
  let fixture: ComponentFixture<TipoExameReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoExameReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExameReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
