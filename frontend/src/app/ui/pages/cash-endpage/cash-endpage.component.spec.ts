import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEndpage } from './cash-endpage.component';

describe('Endpage', () => {
  let component: CashEndpage;
  let fixture: ComponentFixture<CashEndpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashEndpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashEndpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
