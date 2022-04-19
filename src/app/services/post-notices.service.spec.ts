import { TestBed } from '@angular/core/testing';

import { PostNoticesService } from './post-notices.service';

describe('PostNoticesService', () => {
  let service: PostNoticesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostNoticesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
