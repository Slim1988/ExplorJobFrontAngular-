import { NgModule } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { PromoteAdCarouselComponent } from './components/promote-ad-carousel/promote-ad-carousel.component';
import { PromoteLogoCarouselComponent } from './components/promote-logo-carousel/promote-logo-carousel.component';
import { PromotionsProvider } from './providers/promotions.provider';
import { PromotionsService } from './services/promotions.service';

@NgModule({
    imports: [
        InfrastructureModule,
        CarouselModule
    ],
    declarations: [
        PromoteAdCarouselComponent,
        PromoteLogoCarouselComponent
    ],
    exports: [
        PromoteAdCarouselComponent,
        PromoteLogoCarouselComponent
    ],
    providers: [
        PromotionsService,
        PromotionsProvider
    ]
})
export class PromotionsModule { }
