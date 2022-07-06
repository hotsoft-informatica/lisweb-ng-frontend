import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoComponent } from './marcacao.component';

describe('MarcacaoComponent', () => {
  let component: MarcacaoComponent;
  let fixture: ComponentFixture<MarcacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
