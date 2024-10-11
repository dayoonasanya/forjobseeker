import { TestBed } from '@angular/core/testing';

import { WorkexperienceService } from './workexperience.service';

describe('WorkexperienceService', () => {
  let service: WorkexperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkexperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
