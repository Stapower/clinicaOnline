import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaComponentComponent } from './captcha-component.component';

describe('CaptchaComponentComponent', () => {
  let component: CaptchaComponentComponent;
  let fixture: ComponentFixture<CaptchaComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
