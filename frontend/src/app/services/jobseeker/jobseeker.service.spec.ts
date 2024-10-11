import { TestBed } from '@angular/core/testing';

import { JobseekerService } from './jobseeker.service';

describe('JobseekerService', () => {
  let service: JobseekerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobseekerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
