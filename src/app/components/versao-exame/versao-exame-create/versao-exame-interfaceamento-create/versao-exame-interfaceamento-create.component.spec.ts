import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VersaoExameInterfaceamentoCreateComponent } from './versao-exame-interfaceamento-create.component';

describe('VersaoExameInterfaceamentoCreateComponent', () => {
  let component: VersaoExameInterfaceamentoCreateComponent;
  let fixture: ComponentFixture<VersaoExameInterfaceamentoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameInterfaceamentoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoExameInterfaceamentoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
