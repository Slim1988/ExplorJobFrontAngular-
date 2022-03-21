import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthProvider } from '../../../auth/providers/auth.provider';
import { AccountService } from '../../services/account.service';
import { AccountChangePasswordComponent } from './account-change-password.component';

describe('AccountChangePasswordComponent', () => {
    let component: AccountChangePasswordComponent;
    let fixture: ComponentFixture<AccountChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountChangePasswordComponent
            ],
            providers: [
                AccountService,
                AuthProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
