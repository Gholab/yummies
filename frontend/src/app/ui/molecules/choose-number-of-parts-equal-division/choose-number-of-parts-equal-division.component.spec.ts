import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNumberOfPartsEqualDivisionComponent } from './choose-number-of-parts-equal-division.component';

describe('ChooseNumberOfPartsEqualDivision', () => {
  let component: ChooseNumberOfPartsEqualDivisionComponent;
  let fixture: ComponentFixture<ChooseNumberOfPartsEqualDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseNumberOfPartsEqualDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseNumberOfPartsEqualDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
