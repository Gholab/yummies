import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTypeComponent } from './choose-type.component';

describe('ChooseType', () => {
  let component: ChooseTypeComponent;
  let fixture: ComponentFixture<ChooseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
