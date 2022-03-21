import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            BrowserDynamicTestingModule
        ]
    }));

    it('should be created', () => {
        const service: UsersService = TestBed.inject(UsersService);
        expect(service).toBeTruthy();
    });
});
