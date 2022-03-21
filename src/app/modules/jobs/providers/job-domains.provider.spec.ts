import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { JobDomainsProvider } from './job-domains.provider';

describe('JobDomainsProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: JobDomainsProvider = TestBed.inject(JobDomainsProvider);
        expect(service).toBeTruthy();
    });
});
