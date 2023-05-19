import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameAmostraUpdateComponent } from './exame-amostra-update.component';

describe('ExameAmostraUpdateComponent', () => {
  let component: ExameAmostraUpdateComponent;
  let fixture: ComponentFixture<ExameAmostraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExameAmostraUpdateComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameAmostraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
