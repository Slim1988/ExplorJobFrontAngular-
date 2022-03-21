import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { JobUsersProvider } from './job-users.provider';

describe('JobUsersProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: JobUsersProvider = TestBed.inject(JobUsersProvider);
        expect(service).toBeTruthy();
    });
});
