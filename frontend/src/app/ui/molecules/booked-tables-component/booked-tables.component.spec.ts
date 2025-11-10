import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTablesComponent } from './booked-tables.component';

describe('BookedTablesComponent', () => {
  let component: BookedTablesComponent;
  let fixture: ComponentFixture<BookedTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
