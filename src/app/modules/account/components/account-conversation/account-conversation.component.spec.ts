import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { UsersService } from '../../../users/services/users.service';
import { AccountService } from '../../services/account.service';
import { AccountConversationComponent } from './account-conversation.component';

describe('AccountConversationComponent', () => {
    let component: AccountConversationComponent;
    let fixture: ComponentFixture<AccountConversationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountConversationComponent
            ],
            providers: [
                AccountService,
                UsersService,
                JobUsersProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountConversationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
