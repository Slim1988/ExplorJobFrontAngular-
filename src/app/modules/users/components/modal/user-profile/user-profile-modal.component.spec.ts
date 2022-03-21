import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccordionModule, DialogModule } from 'primeng';
import { AccountService } from '../../../../account/services/account.service';
import { JobUsersProvider } from '../../../../jobs/providers/job-users.provider';
import { MessagingModule } from '../../../../messaging/messaging.module';
import { UserFavoritesProvider } from '../../../providers/user-favorites.provider';
import { UsersModule } from '../../../users.module';
import { UsersService } from './../../../services/users.service';
import { UserProfileModalComponent } from './user-profile-modal.component';

describe('UserProfileModalComponent', () => {
    let component: UserProfileModalComponent;
    let fixture: ComponentFixture<UserProfileModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccordionModule,
                BrowserDynamicTestingModule,
                DialogModule,
                HttpClientModule,
                MessagingModule,
                RouterTestingModule,
                UsersModule
            ],
            declarations: [
                UserProfileModalComponent
            ],
            providers: [
                AccountService,
                JobUsersProvider,
                UserFavoritesProvider,
                UsersService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
