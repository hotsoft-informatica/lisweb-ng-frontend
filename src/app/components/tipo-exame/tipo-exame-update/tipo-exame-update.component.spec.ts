import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExameUpdateComponent } from './tipo-exame-update.component';

describe('TipoExameUpdateComponent', () => {
  let component: TipoExameUpdateComponent;
  let fixture: ComponentFixture<TipoExameUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoExameUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
