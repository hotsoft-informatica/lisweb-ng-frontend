import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBiologicoDeleteComponent } from './material-biologico-delete.component';

describe('MaterialBiologicoDeleteComponent', () => {
  let component: MaterialBiologicoDeleteComponent;
  let fixture: ComponentFixture<MaterialBiologicoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialBiologicoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBiologicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
