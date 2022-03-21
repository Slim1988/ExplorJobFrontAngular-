import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputTextModule, MultiSelectModule, } from 'primeng';
import { CompaniesProvider } from '../../providers/companies.provider';
import { CompanyImageModalComponent } from './company-image-modal.component';

describe('CompanyImageModalComponent', () => {
    let component: CompanyImageModalComponent;
    let fixture: ComponentFixture<CompanyImageModalComponent>;

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
                CompanyImageModalComponent
            ],
            providers: [
                CompaniesProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyImageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
