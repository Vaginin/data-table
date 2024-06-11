import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataPopupComponent } from './add-data-popup.component';

describe('AddDataPopupComponent', () => {
  let component: AddDataPopupComponent;
  let fixture: ComponentFixture<AddDataPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
