import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameReadComponent } from './versao-exame-read.component';

describe('VersaoExameReadComponent', () => {
  let component: VersaoExameReadComponent;
  let fixture: ComponentFixture<VersaoExameReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoExameReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
