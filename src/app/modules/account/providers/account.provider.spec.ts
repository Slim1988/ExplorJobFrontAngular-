import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AccountProvider } from './account.provider';

describe('AccountProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: AccountProvider = TestBed.inject(AccountProvider);
        expect(service).toBeTruthy();
    });
});
