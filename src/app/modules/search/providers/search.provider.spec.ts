import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SearchProvider } from './search.provider';

describe('SearchProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: SearchProvider = TestBed.inject(SearchProvider);
        expect(service).toBeTruthy();
    });
});
