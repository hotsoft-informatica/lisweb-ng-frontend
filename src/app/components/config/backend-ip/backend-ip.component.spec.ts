import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendIpComponent } from './backend-ip.component';

describe('BackendIpComponent', () => {
  let component: BackendIpComponent;
  let fixture: ComponentFixture<BackendIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BackendIpComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BackendIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
