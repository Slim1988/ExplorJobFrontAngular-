import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AgglomerationsProvider } from './agglomerations.provider';

describe('AgglomerationsProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: AgglomerationsProvider = TestBed.inject(AgglomerationsProvider);
        expect(service).toBeTruthy();
    });
});
