import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputTextModule, MultiSelectModule, } from 'primeng';
import { CompaniesProvider } from './../../providers/companies.provider';
import { CompanyComponent } from './company.component';

describe('CompanyComponent', () => {
    let component: CompanyComponent;
    let fixture: ComponentFixture<CompanyComponent>;

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
                CompanyComponent
            ],
            providers: [
                CompaniesProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
