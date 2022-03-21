import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../auth/services/auth.service';
import { AccountProvider } from '../providers/account.provider';
import { AccountService } from './account.service';

describe('AccountService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule,
            RouterTestingModule
        ],
        providers: [
            AuthService,
            AccountProvider
        ]
    }));

    it('should be created', () => {
        const service: AccountService = TestBed.inject(AccountService);
        expect(service).toBeTruthy();
    });
});
