import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyyRedirectComponent } from './addyy-redirect.component';

describe('AddyyRedirectComponent', () => {
  let component: AddyyRedirectComponent;
  let fixture: ComponentFixture<AddyyRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddyyRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddyyRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
