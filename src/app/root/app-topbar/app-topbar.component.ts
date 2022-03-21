import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CONFIG } from '../../config/config';
import { REDIRECTIONS } from '../../config/redirections';
import { ParentComponent } from '../../infrastructure/components/parent.component';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app-topbar.component.html',
    styleUrls: [
        './app-topbar.component.css'
     ]//,
    // encapsulation: ViewEncapsulation.None
})
export class AppTopbarComponent extends ParentComponent implements OnInit {
    @Output()
    public burgerMenuTriggered: EventEmitter<string> = new EventEmitter();

    public readonly redirections: any = REDIRECTIONS;

    public readonly facebookUrl: string = CONFIG.explorJob.socialMedias.facebook;
    public readonly instagramUrl: string = CONFIG.explorJob.socialMedias.instagram;
    public readonly linkedInUrl: string = CONFIG.explorJob.socialMedias.linkedIn;

    public constructor(
        public readonly authService: AuthService
    ) {
        super();
    }

    public ngOnInit(): void { }

    public triggerBurgerMenu(): void {
        this.burgerMenuTriggered.emit('');
    }
}
