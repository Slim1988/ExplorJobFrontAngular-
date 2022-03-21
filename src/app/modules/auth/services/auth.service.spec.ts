import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthProvider } from './../providers/auth.provider';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule,
            HttpClientModule,
            RouterTestingModule
        ],
        providers: [
            AuthProvider
        ]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.inject(AuthService);
        expect(service).toBeTruthy();
    });
});
