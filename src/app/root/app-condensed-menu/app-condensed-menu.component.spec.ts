import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountProvider } from '../../modules/account/providers/account.provider';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AccountService } from './../../modules/account/services/account.service';
import { AppCondensedMenuComponent } from './app-condensed-menu.component';

describe('AppCondensedMenuComponent', () => {
    let component: AppCondensedMenuComponent;
    let fixture: ComponentFixture<AppCondensedMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AppCondensedMenuComponent
            ],
            providers: [
                AuthService,
                AccountService,
                AccountProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppCondensedMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
