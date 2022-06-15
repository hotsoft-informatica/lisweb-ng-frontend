import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameCrudComponent } from './versao-exame-crud.component';

describe('VersaoExameCrudComponent', () => {
  let component: VersaoExameCrudComponent;
  let fixture: ComponentFixture<VersaoExameCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoExameCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
