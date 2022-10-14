import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartV2Component } from './cart-v2.component';

describe('CartV2Component', () => {
  let component: CartV2Component;
  let fixture: ComponentFixture<CartV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
