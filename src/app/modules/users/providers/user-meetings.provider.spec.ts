import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserMeetingsProvider } from './user-meetings.provider';

describe('UserMeetingsProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: UserMeetingsProvider = TestBed.inject(UserMeetingsProvider);
        expect(service).toBeTruthy();
    });
});
