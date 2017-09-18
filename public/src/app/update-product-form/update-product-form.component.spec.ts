import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductFormComponent } from './update-product-form.component';

describe('UpdateProductFormComponent', () => {
  let component: UpdateProductFormComponent;
  let fixture: ComponentFixture<UpdateProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
