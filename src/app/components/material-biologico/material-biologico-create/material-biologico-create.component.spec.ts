import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBiologicoCreateComponent } from './material-biologico-create.component';

describe('MaterialBiologicoCreateComponent', () => {
  let component: MaterialBiologicoCreateComponent;
  let fixture: ComponentFixture<MaterialBiologicoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialBiologicoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBiologicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
