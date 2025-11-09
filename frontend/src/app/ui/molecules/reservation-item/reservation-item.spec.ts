import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationItem } from './reservation-item';

describe('ReservationItem', () => {
  let component: ReservationItem;
  let fixture: ComponentFixture<ReservationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
