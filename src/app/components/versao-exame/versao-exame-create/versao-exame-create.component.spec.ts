import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameCreateComponent } from './versao-exame-create.component';

describe('VersaoExameCreateComponent', () => {
  let component: VersaoExameCreateComponent;
  let fixture: ComponentFixture<VersaoExameCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoExameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
