import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';

@Component({
    selector: 'cgu',
    templateUrl: './cgu.component.html',
    styleUrls: [
        './cgu.component.css'
    ]
})
export class CguComponent extends ParentComponent implements OnInit {
    public constructor() {
        super();
    }

    public ngOnInit(): void { }
}
