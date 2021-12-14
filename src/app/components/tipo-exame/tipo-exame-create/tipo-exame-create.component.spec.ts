import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExameCreateComponent } from './tipo-exame-create.component';

describe('TipoExameCreateComponent', () => {
  let component: TipoExameCreateComponent;
  let fixture: ComponentFixture<TipoExameCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoExameCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
