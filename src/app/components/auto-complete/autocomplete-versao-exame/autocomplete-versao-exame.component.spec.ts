import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteVersaoExameComponent } from './autocomplete-versao-exame.component';

describe('VersaoExameComponent', () => {
  let component: AutoCompleteVersaoExameComponent;
  let fixture: ComponentFixture<AutoCompleteVersaoExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCompleteVersaoExameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCompleteVersaoExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
