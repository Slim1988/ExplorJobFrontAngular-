import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { CompanyPromote } from '../../models/company-promote.model';

@Component({
    selector: 'promote-ad-carousel',
    templateUrl: './promote-ad-carousel.component.html',
    styleUrls: [
        './promote-ad-carousel.component.css'
    ]
})
export class PromoteAdCarouselComponent implements OnChanges {

    @Input()
    public companiesToDisplay: Array<CompanyPromote>;

    public orderedCompaniesToDisplay: Array<CompanyPromote | Array<CompanyPromote>> = [];

    public carouselLogoCapacity: number;
    public sliderInterval = CONFIG.promotions.slidersIntervals.logoAndMessage;

    private previousCarouselLogoCapacity: number = 0;

    public constructor(
        private readonly router: Router,
        public breakpointObserver: BreakpointObserver
    ) { }

    public ngOnChanges(changes: SimpleChanges) {
        this.breakpointObserver
            .observe(
                [
                    Breakpoints.XSmall,
                    Breakpoints.Small,
                    Breakpoints.Medium,
                    Breakpoints.Large,
                    Breakpoints.XLarge
                ]
            )
            .subscribe((state: BreakpointState) => {
                if (state.breakpoints[Breakpoints.XLarge]) {
                    this.carouselLogoCapacity = 5;
                }
                else if (state.breakpoints[Breakpoints.Large]) {
                    this.carouselLogoCapacity = 3;
                }
                else if (state.breakpoints[Breakpoints.Medium]) {
                    this.carouselLogoCapacity = 3;
                }
                else if (state.breakpoints[Breakpoints.Small]) {
                    this.carouselLogoCapacity = 2;
                }
                else if (state.breakpoints[Breakpoints.XSmall]) {
                    this.carouselLogoCapacity = 1;
                }
                if (this.carouselLogoCapacity !== this.previousCarouselLogoCapacity) {
                    this.setOrderedCompaniesToDisplay();
                    this.previousCarouselLogoCapacity = this.carouselLogoCapacity;
                }
            });
    }

    public isLoaded(): boolean {
        return !R.isNil(this.orderedCompaniesToDisplay) && !R.isEmpty(this.orderedCompaniesToDisplay);
    }

    public isArray(
        sliderItem: CompanyPromote | Array<CompanyPromote>
    ): boolean {
        return Array.isArray(sliderItem);
    }

    public goToCompanyPage(
        slug: string
    ) {
        this.router.navigateByUrl(`company/${slug}`);
    }

    private fitlerPromoteArray(
        promotes: Array<CompanyPromote>,
        withMessage: boolean
    ): Array<CompanyPromote> {
        return promotes.filter(
            (promote: CompanyPromote) => withMessage ?
                !R.isNil(promote.message) && !R.isEmpty(promote.message)
                : R.isNil(promote.message) || R.isEmpty(promote.message)
        );
    }

    private shuffleArray(
        promotes: Array<CompanyPromote>
    ): Array<CompanyPromote> {
        for (let index = promotes.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [promotes[index], promotes[randomIndex]] = [promotes[randomIndex], promotes[index]];
        }
        return promotes;
    }

    private groupArrayByCapacity(
        arrayToGroup: Array<CompanyPromote>,
        capacity: number
    ): Array<Array<CompanyPromote>> {
        const tempArray = arrayToGroup.map(e => e);
        const newArray = [];

        while (!R.isEmpty(tempArray)) {
            const slicedItems = tempArray.splice(0, this.carouselLogoCapacity);
            newArray.push(slicedItems);
        }
        return newArray;
    }

    private setOrderedCompaniesToDisplay() {

        const promotionMessages = this.shuffleArray(
            this.fitlerPromoteArray(this.companiesToDisplay, true)
        );
        const promotionLogos = this.shuffleArray(
            this.fitlerPromoteArray(this.companiesToDisplay, false)
        );
        const groupedPromotionLogos = this.groupArrayByCapacity(
            promotionLogos,
            this.carouselLogoCapacity
        );

        this.orderedCompaniesToDisplay = new Array();

        while (!R.isEmpty(promotionMessages) || !R.isEmpty(groupedPromotionLogos)) {

            if (!R.isEmpty(promotionMessages)) {
                const splicedMessageItem = promotionMessages.splice(0, 1);
                this.orderedCompaniesToDisplay.push(...splicedMessageItem);
            }

            if (!R.isEmpty(groupedPromotionLogos)) {
                const splicedLogosArray = groupedPromotionLogos.splice(0, 1);
                this.orderedCompaniesToDisplay.push(...splicedLogosArray);
            }
        }

    }
}

