import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataPopupComponent } from './edit-data-popup.component';

describe('EditDataPopupComponent', () => {
  let component: EditDataPopupComponent;
  let fixture: ComponentFixture<EditDataPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDataPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
