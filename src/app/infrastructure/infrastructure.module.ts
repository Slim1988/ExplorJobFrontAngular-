import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './components/loader/loader.component';
import { EncoderService } from './services/encoder.service';
import { FilterService } from './services/filter.service';
import { ObjectsManipulatorService } from './services/objects-manipulator.service';
import { VideosService } from './services/videos.service';

@NgModule({
    imports: [
        CommonModule,
        ProgressSpinnerModule
    ],
    declarations: [
        LoaderComponent
    ],
    exports: [
        CommonModule,
        LoaderComponent
    ],
    providers: [
        EncoderService,
        ObjectsManipulatorService,
        FilterService,
        VideosService
    ]
})
export class InfrastructureModule { }
