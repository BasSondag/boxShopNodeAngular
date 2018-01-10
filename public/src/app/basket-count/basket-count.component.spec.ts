import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketCountComponent } from './basket-count.component';

describe('BasketCountComponent', () => {
  let component: BasketCountComponent;
  let fixture: ComponentFixture<BasketCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
