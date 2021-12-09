import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBiologicoReadComponent } from './material-biologico-read.component';

describe('MaterialBiologicoReadComponent', () => {
  let component: MaterialBiologicoReadComponent;
  let fixture: ComponentFixture<MaterialBiologicoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialBiologicoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBiologicoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
