import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyUrlComponent } from './addy-url.component';

describe('AddyUrlComponent', () => {
  let component: AddyUrlComponent;
  let fixture: ComponentFixture<AddyUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddyUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
