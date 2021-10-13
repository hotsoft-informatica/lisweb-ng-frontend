import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBiologicoUpdateComponent } from './material-biologico-update.component';

describe('MaterialBiologicoUpdateComponent', () => {
  let component: MaterialBiologicoUpdateComponent;
  let fixture: ComponentFixture<MaterialBiologicoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialBiologicoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBiologicoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
