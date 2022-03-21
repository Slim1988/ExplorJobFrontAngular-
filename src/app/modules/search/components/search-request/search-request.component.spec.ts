import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputTextModule, MultiSelectModule, } from 'primeng';
import { JobDomainsProvider } from '../../../jobs/providers/job-domains.provider';
import { SearchService } from '../../services/search.service';
import { SearchRequestComponent } from './search-request.component';

describe('SearchRequestComponent', () => {
    let component: SearchRequestComponent;
    let fixture: ComponentFixture<SearchRequestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                MultiSelectModule,
                InputTextModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                SearchRequestComponent
            ],
            providers: [
                SearchService,
                JobDomainsProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
