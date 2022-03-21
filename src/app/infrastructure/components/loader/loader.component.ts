import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent.component';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: [
        './loader.component.css'
    ]
})
export class LoaderComponent extends ParentComponent implements OnInit {
    public constructor() {
        super();
    }

    public ngOnInit(): void { }
}
