import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameParametroComponent } from './versao-exame-parametro.component';

describe('VersaoExameParametroComponent', () => {
  let component: VersaoExameParametroComponent;
  let fixture: ComponentFixture<VersaoExameParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameParametroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoExameParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
