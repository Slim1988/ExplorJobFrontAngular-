import { Component, OnInit, ViewChild } from '@angular/core';
import { CONFIG } from '../../../../config/config';
import { VideosService } from '../../../../infrastructure/services/videos.service';
import { AccountService } from '../../../account/services/account.service';
import { ParentComponent } from './../../../../infrastructure/components/parent.component';

@Component({
    selector: 'help',
    templateUrl: './help.component.html',
    styleUrls: [
        './help.component.css'
    ]
})
export class HelpComponent extends ParentComponent implements OnInit {
    @ViewChild('videoFrame')
    public videoFrame: HTMLElement|any;

    public displayHelpModal: boolean = false;

    public constructor(
        public readonly accountService: AccountService,
        private readonly videosService: VideosService
    ) {
        super();
    }

    public get videoUrlProfessional(): any {
        return this.videosService.useYoutubeVideo(
            CONFIG.explorJob.help.videoUrls.professional
        );
    }

    public get videoUrlExplorer(): any {
        return this.videosService.useYoutubeVideo(
            CONFIG.explorJob.help.videoUrls.explorer
        );
    }

    public get faqUrl(): string {
        return CONFIG.explorJob.help.faqUrl;
    }

    public get contactEmail(): string {
        return CONFIG.explorJob.help.contactEmail;
    }

    public ngOnInit(): void { }

    public showModal(): void {
        this.displayHelpModal = true;
    }

    public hideModal(): void {
        this.displayHelpModal = false;
    }
}
