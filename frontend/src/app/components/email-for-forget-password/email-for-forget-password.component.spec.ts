import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForForgetPasswordComponent } from './email-for-forget-password.component';

describe('EmailForForgetPasswordComponent', () => {
  let component: EmailForForgetPasswordComponent;
  let fixture: ComponentFixture<EmailForForgetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailForForgetPasswordComponent]
    });
    fixture = TestBed.createComponent(EmailForForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
