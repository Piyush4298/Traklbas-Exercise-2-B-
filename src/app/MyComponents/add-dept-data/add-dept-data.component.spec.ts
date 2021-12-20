import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeptDataComponent } from './add-dept-data.component';

describe('AddDeptDataComponent', () => {
  let component: AddDeptDataComponent;
  let fixture: ComponentFixture<AddDeptDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeptDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeptDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
