import { TestBed } from '@angular/core/testing';

import { CaptchaValidationService } from './captcha-validation.service';

describe('CaptchaValidationService', () => {
  let service: CaptchaValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
