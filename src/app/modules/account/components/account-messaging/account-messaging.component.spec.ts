import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule } from 'primeng';
import { FilterService } from '../../../../infrastructure/services/filter.service';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { UserMeetingsProvider } from '../../../users/providers/user-meetings.provider';
import { UsersService } from '../../../users/services/users.service';
import { AccountService } from '../../services/account.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { MessagingProvider } from './../../../messaging/providers/messaging.provider';
import { AccountMessagingComponent } from './account-messaging.component';

describe('AccountMessagingComponent', () => {
    let component: AccountMessagingComponent;
    let fixture: ComponentFixture<AccountMessagingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                ConfirmDialogModule,
                HttpClientModule,
                InfrastructureModule,
                RouterTestingModule
            ],
            declarations: [
                AccountMessagingComponent
            ],
            providers: [
                AccountService,
                UsersService,
                MessagingProvider,
                JobUsersProvider,
                UserMeetingsProvider,
                FilterService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountMessagingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
