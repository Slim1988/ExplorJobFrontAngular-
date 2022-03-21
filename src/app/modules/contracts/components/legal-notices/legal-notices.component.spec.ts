import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LegalNoticesComponent } from './legal-notices.component';

describe('LegalNoticesComponent', () => {
    let component: LegalNoticesComponent;
    let fixture: ComponentFixture<LegalNoticesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule
            ],
            declarations: [
                LegalNoticesComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegalNoticesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
