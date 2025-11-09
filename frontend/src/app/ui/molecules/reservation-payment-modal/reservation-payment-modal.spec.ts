import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentModal } from './reservation-payment-modal';

describe('ReservationPaymentModal', () => {
  let component: ReservationPaymentModal;
  let fixture: ComponentFixture<ReservationPaymentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPaymentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPaymentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
