import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameUpdateComponent } from './versao-exame-update.component';

describe('VersaoExameUpdateComponent', () => {
  let component: VersaoExameUpdateComponent;
  let fixture: ComponentFixture<VersaoExameUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoExameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
