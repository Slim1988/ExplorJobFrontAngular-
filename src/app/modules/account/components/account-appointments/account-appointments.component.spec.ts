import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAppointmentsComponent } from './account-appointments.component';

describe('AccountAppointmentsComponent', () => {
  let component: AccountAppointmentsComponent;
  let fixture: ComponentFixture<AccountAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
