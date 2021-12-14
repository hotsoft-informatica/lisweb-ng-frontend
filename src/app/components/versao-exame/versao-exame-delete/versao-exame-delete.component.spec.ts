import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameDeleteComponent } from './versao-exame-delete.component';

describe('VersaoExameDeleteComponent', () => {
  let component: VersaoExameDeleteComponent;
  let fixture: ComponentFixture<VersaoExameDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoExameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
