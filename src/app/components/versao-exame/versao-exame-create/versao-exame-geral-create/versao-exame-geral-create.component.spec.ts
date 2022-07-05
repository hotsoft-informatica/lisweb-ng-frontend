import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoExameGeralCreateComponent } from './versao-exame-geral-create.component';

describe('VersaoExameGeralCreateComponent', () => {
  let component: VersaoExameGeralCreateComponent;
  let fixture: ComponentFixture<VersaoExameGeralCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoExameGeralCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoExameGeralCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
