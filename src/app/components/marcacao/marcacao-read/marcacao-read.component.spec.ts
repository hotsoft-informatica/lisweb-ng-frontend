import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoReadComponent } from './marcacao-read.component';

describe('MarcacaoReadComponent', () => {
  let component: MarcacaoReadComponent;
  let fixture: ComponentFixture<MarcacaoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcacaoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
