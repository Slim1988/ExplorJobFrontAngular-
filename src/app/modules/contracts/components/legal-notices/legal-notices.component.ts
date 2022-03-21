import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';

@Component({
    selector: 'legal-notices',
    templateUrl: './legal-notices.component.html',
    styleUrls: [
        './legal-notices.component.css'
    ]
})
export class LegalNoticesComponent extends ParentComponent implements OnInit {
    public constructor() {
        super();
    }

    public ngOnInit(): void { }
}
