import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaymentComponent } from './custom-payment.component';

describe('CustomPaymentComponent', () => {
  let component: CustomPaymentComponent;
  let fixture: ComponentFixture<CustomPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
