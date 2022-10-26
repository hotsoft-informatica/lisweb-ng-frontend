import { TestBed } from '@angular/core/testing';

import { UserExitGuard } from './user-exit.guard';

describe('UserExitGuard', () => {
  let guard: UserExitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserExitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
