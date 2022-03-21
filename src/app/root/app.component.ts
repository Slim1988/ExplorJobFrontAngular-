import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CONFIG } from '../config/config';
import { AuthService } from '../modules/auth/services/auth.service';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})
export class AppComponent {
    public displayCondensedMenu: boolean = false;

    public constructor(
        private readonly authService: AuthService,
        public readonly router: Router
    ) {
        const navEndEvents = router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        );

        navEndEvents.subscribe(
            (event: NavigationEnd) => {
                gtag(
                    'config',
                    CONFIG.cookies.IdMeasure,
                    {
                        linker: {
                            domains: CONFIG.cookies.domains
                        },
                        'page_title' : event.urlAfterRedirects,
                        'page_path': event.urlAfterRedirects
                    }
                );
            }
        );

        registerLocaleData(localeFr);
    }

    public get displayHelpButton(): boolean {
        return this.authService.isLoggedIn();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(
        event: any
    ) {
        if (event.target.innerWidth > 767) {
            this.displayCondensedMenu = false;
        }
    }

    public handleTriggerDisplayCondensedMenu(
        event: any
    ): void {
        this.displayCondensedMenu = !this.displayCondensedMenu;
    }
}
