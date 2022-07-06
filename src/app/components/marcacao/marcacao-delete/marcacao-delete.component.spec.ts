import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoDeleteComponent } from './marcacao-delete.component';

describe('MarcacaoDeleteComponent', () => {
  let component: MarcacaoDeleteComponent;
  let fixture: ComponentFixture<MarcacaoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcacaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
