import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'primeng';
import { AuthProvider } from '../../../auth/providers/auth.provider';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { AccountLayoutSidebarComponent } from './account-layout-sidebar.component';

describe('AccountLayoutSidebarComponent', () => {
    let component: AccountLayoutSidebarComponent;
    let fixture: ComponentFixture<AccountLayoutSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                DialogModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountLayoutSidebarComponent
            ],
            providers: [
                AuthService,
                AuthProvider,
                AccountService,
                AccountProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountLayoutSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
