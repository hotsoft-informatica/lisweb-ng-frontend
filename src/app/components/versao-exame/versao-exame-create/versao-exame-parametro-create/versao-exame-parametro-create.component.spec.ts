import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameParametroCreateComponent } from './versao-exame-parametro-create.component';

describe('VersaoExameParametroCreateComponent', () => {
  let component: VersaoExameParametroCreateComponent;
  let fixture: ComponentFixture<VersaoExameParametroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameParametroCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoExameParametroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
