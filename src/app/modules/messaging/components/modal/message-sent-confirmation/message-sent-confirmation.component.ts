import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { ParentComponent } from '../../../../../infrastructure/components/parent.component';
import { PromotionsService } from '../../../../promotions/services/promotions.service';
import { CompanyPromote } from './../../../../promotions/models/company-promote.model';

export interface MessageSentConfirmationModalOptions {
    display: boolean;
    success: boolean;
}

@Component({
    selector: 'message-sent-confirmation',
    templateUrl: './message-sent-confirmation.component.html',
    styleUrls: [
        './message-sent-confirmation.component.css'
    ],
})
export class MessageSentConfirmationComponent extends ParentComponent implements OnChanges {

    @Input()
    public options: MessageSentConfirmationModalOptions;

    public promotes: Array<CompanyPromote>;

    public constructor(
        private readonly promotionsService: PromotionsService
     ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.promotes = this.promotionsService.getPromotes();
    }

}
