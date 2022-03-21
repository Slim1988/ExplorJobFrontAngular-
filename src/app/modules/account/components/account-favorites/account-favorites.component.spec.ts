import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule, MessageModule, MessagesModule } from 'primeng';
import { FilterService } from '../../../../infrastructure/services/filter.service';
import { MessagingModule } from '../../../messaging/messaging.module';
import { UserFavoritesProvider } from '../../../users/providers/user-favorites.provider';
import { UserMeetingsProvider } from '../../../users/providers/user-meetings.provider';
import { UsersModule } from '../../../users/users.module';
import { AccountService } from '../../services/account.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { AccountFavoritesComponent } from './account-favorites.component';

describe('AccountFavoritesComponent', () => {
    let component: AccountFavoritesComponent;
    let fixture: ComponentFixture<AccountFavoritesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                ConfirmDialogModule,
                HttpClientModule,
                InfrastructureModule,
                MessagesModule,
                MessageModule,
                MessagingModule,
                RouterTestingModule,
                UsersModule
            ],
            declarations: [
                AccountFavoritesComponent
            ],
            providers: [
                AccountService,
                UserFavoritesProvider,
                UserMeetingsProvider,
                FilterService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountFavoritesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
