import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Endpage } from './endpage';

describe('Endpage', () => {
  let component: Endpage;
  let fixture: ComponentFixture<Endpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Endpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Endpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
