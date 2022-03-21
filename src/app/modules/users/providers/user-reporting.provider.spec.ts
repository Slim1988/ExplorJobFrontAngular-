import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserReportingProvider } from './user-reporting.provider';

describe('UserReportingProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: UserReportingProvider = TestBed.inject(UserReportingProvider);
        expect(service).toBeTruthy();
    });
});
