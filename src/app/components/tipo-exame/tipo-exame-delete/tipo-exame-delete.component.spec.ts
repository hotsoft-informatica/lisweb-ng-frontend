import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExameDeleteComponent } from './tipo-exame-delete.component';

describe('TipoExameDeleteComponent', () => {
  let component: TipoExameDeleteComponent;
  let fixture: ComponentFixture<TipoExameDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoExameDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
