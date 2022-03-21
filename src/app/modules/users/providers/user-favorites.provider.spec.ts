import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserFavoritesProvider } from './user-favorites.provider';

describe('UserFavoritesProvider', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: UserFavoritesProvider = TestBed.inject(UserFavoritesProvider);
        expect(service).toBeTruthy();
    });
});
