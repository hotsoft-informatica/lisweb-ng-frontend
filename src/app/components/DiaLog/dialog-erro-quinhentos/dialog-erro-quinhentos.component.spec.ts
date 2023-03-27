import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErroQuinhentosComponent } from './dialog-erro-quinhentos.component';

describe('DialogErroQuinhentosComponent', () => {
  let component: DialogErroQuinhentosComponent;
  let fixture: ComponentFixture<DialogErroQuinhentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogErroQuinhentosComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DialogErroQuinhentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
