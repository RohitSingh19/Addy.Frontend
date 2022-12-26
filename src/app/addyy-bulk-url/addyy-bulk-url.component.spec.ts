import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyyBulkUrlComponent } from './addyy-bulk-url.component';

describe('AddyyBulkUrlComponent', () => {
  let component: AddyyBulkUrlComponent;
  let fixture: ComponentFixture<AddyyBulkUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddyyBulkUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddyyBulkUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
