import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminComponent } from './dashboard-admin.component';

describe('DashboardAdminComponent', () => {
  let component: ShowAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
