import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStepsNavbarComponent } from './payment-steps-navbar.component';

describe('PaymentStepsNavbar', () => {
  let component: PaymentStepsNavbarComponent;
  let fixture: ComponentFixture<PaymentStepsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStepsNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStepsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
