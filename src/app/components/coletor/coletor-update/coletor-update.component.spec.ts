import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetorUpdateComponent } from './coletor-update.component';

describe('ColetorUpdateComponent', () => {
  let component: ColetorUpdateComponent;
  let fixture: ComponentFixture<ColetorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ColetorUpdateComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
