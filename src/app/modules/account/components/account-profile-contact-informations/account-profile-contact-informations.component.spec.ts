import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersProvider } from '../../../users/providers/users.provider';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { AccountProfileContactInformationsComponent } from './account-profile-contact-informations.component';

describe('AccountProfileContactInformationsComponent', () => {
    let component: AccountProfileContactInformationsComponent;
    let fixture: ComponentFixture<AccountProfileContactInformationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                InfrastructureModule,
                RouterTestingModule
            ],
            declarations: [
                AccountProfileContactInformationsComponent
            ],
            providers: [
                AccountService,
                AccountProvider,
                UsersProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountProfileContactInformationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
