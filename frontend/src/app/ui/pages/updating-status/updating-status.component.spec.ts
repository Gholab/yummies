import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingStatusComponent } from './updating-status.component';

describe('CheckStatus', () => {
  let component: UpdatingStatusComponent;
  let fixture: ComponentFixture<UpdatingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
