import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';
import { ParentComponent } from '../../../infrastructure/components/parent.component';
import { REDIRECTIONS } from './../../../config/redirections';

@Component({
    selector: 'redirector',
    templateUrl: './redirector.component.html',
    styleUrls: [
        './redirector.component.css'
    ]
})
export class RedirectorComponent extends ParentComponent implements OnInit {
    public constructor(
        private route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        const path: string = this.route.snapshot.routeConfig.path;

        const redirection: {
            path: string;
            url: string;
        }|undefined = REDIRECTIONS[path];

        this.redirectTo(
            !R.isNil(redirection)
                ? redirection.url
                : REDIRECTIONS.default.url
        );
    }

    private redirectTo(
        url: string
    ): void {
        window.location.href = url.toString();
    }
}
