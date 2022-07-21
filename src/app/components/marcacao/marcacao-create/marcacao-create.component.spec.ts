import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoCreateComponent } from './marcacao-create.component';

describe('MarcacaoCreateComponent', () => {
  let component: MarcacaoCreateComponent;
  let fixture: ComponentFixture<MarcacaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
