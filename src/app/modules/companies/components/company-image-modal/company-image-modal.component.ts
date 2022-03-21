import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';

@Component({
    selector: 'company-image-modal',
    templateUrl: './company-image-modal.component.html',
    styleUrls: [
        './company-image-modal.component.css'
    ]
})
export class CompanyImageModalComponent extends ParentComponent implements OnInit {
    @Input()
    public imageUrl: string;

    @Input()
    public showModal: boolean;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        super();
    }

    public ngOnInit(): void {
    }

    public handleModalClose(): void {
        this.events.emit('close');
        this.showModal = false;
    }
}
