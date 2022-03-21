import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule
        ]
    }));

    it('should be created', () => {
        const service: SearchService = TestBed.inject(SearchService);
        expect(service).toBeTruthy();
    });
});
