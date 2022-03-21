import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { CompanyPromote } from '../../models/company-promote.model';

@Component({
    selector: 'promote-logo-carousel',
    templateUrl: './promote-logo-carousel.component.html',
    styleUrls: [
        './promote-logo-carousel.component.css'
    ]
})
export class PromoteLogoCarouselComponent extends ParentComponent implements OnChanges {

    @Input()
    public companiesToDisplay: Array<CompanyPromote>;

    @Input()
    public showMessage: boolean;

    public sliderInterval = CONFIG.promotions.slidersIntervals.logoOnly;
    public responsiveOptions = [];

    public constructor(
        private readonly router: Router
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.setSliderResponsiveOptions();
        this.shuffleCompaniesToDisplay();
    }

    public isLoaded() {
        return this.companiesToDisplay?.length > 0;
    }

    public goToCompanyPage(slug: string) {
        this.router.navigateByUrl(`company/${slug}`);
    }

    private shuffleCompaniesToDisplay() {
        for (let index = this.companiesToDisplay?.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [this.companiesToDisplay[index], this.companiesToDisplay[randomIndex]] = [this.companiesToDisplay[randomIndex], this.companiesToDisplay[index]];
        }
    }

    private setSliderResponsiveOptions() {
        this.responsiveOptions = [
            {
                breakpoint: '2000px',
                numVisible: this.showMessage ? 5 : 3,
                numScroll: this.showMessage ? 5 : 3
            },
            {
                breakpoint: '1700px',
                numVisible: this.showMessage ? 4 : 2,
                numScroll: this.showMessage ? 4 : 2
            },
            {
                breakpoint: '1300px',
                numVisible: this.showMessage ? 3 : 2,
                numScroll: this.showMessage ? 3 : 2
            },
            {
                breakpoint: '1000px',
                numVisible: this.showMessage ? 2 : 1,
                numScroll: this.showMessage ? 2 : 1
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
