import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment-timezone';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'proposal-calendar',
    templateUrl: './proposal-calendar.component.html',
    styleUrls: ['./proposal-calendar.component.css'],
})
export class ProposalCalendarComponent
    extends ParentComponent
    implements OnInit {
    @Output()
    public propsalEvent: EventEmitter<moment.Moment[]> = new EventEmitter();
    @ViewChild('picker') public picker: any;

    public date: moment.Moment;
    public dates: moment.Moment[];
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public minDate: moment.Moment;
    public maxDate: moment.Moment;
    public stepHour = 1;
    public stepMinute = 15;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';
    public dateControl: FormControl;
    public constructor() {
        super();
    }

    public ngOnInit(): void {
        this.dates = [];
        this.minDate = moment();
        this.ResetDate();
    }
    public handleDatesChange(): void {
        this.propsalEvent.emit(this.dates);
    }
    public ResetDate(): void {
        this.date = moment().add(1, 'days').set({
            hour: 8,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
    }
    public AddDate(): void {
        if (
            this.dates.find((date) =>
                date.isSame(this.date as moment.Moment)
            ) === undefined &&
            this.dates.length <= 3
        ) {
            this.dates.push(this.date);
            this.handleDatesChange();
        }
    }
    public DeleteDate(dateToDelete: moment.Moment): void {
        const index: number = this.dates.indexOf(dateToDelete);
        if (index !== -1) {
            this.dates.splice(index, 1);
            this.handleDatesChange();
        }
    }
}
