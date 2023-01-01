import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyyToolsComponent } from './addyy-tools.component';

describe('AddyyToolsComponent', () => {
  let component: AddyyToolsComponent;
  let fixture: ComponentFixture<AddyyToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddyyToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddyyToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
