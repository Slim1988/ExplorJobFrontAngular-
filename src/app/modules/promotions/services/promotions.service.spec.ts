import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PromotionsService } from './promotions.service';

describe('PromotionsService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule
        ]
    }));

    it('should be created', () => {
        const service: PromotionsService = TestBed.inject(PromotionsService);
        expect(service).toBeTruthy();
    });
});
