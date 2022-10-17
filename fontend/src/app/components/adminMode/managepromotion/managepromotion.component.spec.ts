import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepromotionComponent } from './managepromotion.component';

describe('ManagepromotionComponent', () => {
  let component: ManagepromotionComponent;
  let fixture: ComponentFixture<ManagepromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
