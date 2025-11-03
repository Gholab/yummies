import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCarousel } from './cart-item-carousel';

describe('CartItemCarousel', () => {
  let component: CartItemCarousel;
  let fixture: ComponentFixture<CartItemCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
