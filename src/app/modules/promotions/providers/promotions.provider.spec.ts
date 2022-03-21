import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PromotionsProvider } from './promotions.provider';

describe('PromotionsProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: PromotionsProvider = TestBed.inject(PromotionsProvider);
        expect(service).toBeTruthy();
    });
});
