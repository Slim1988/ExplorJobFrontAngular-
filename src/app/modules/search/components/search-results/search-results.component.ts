import { Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountFavorite } from '../../../account/models/account-favorite.model';
import { AccountService } from '../../../account/services/account.service';
import { JobUser } from '../../../jobs/models/job-user.model';
import { MessageSentConfirmationModalOptions } from '../../../messaging/components/modal/message-sent-confirmation/message-sent-confirmation.component';
import { WriteMessageModalOptions } from '../../../messaging/components/modal/write-message/write-message-modal.component';
import { MessageEvents } from '../../../messaging/events/message.events';
import { CompanyPromote } from '../../../promotions/models/company-promote.model';
import { UserFavoriteCreateCommand } from '../../../users/commands/user-favorite-create.command';
import { UserFavoriteDeleteCommand } from '../../../users/commands/user-favorite-delete.command';
import { UserProfileModalSettings } from '../../../users/components/modal/user-profile/user-profile-modal.component';
import { User } from '../../../users/models/user.model';
import { UserFavoritesProvider } from '../../../users/providers/user-favorites.provider';
import { SearchResultPublic } from '../../models/search-result-public.model';
import { SearchResultRestricted } from '../../models/search-result-restricted.model';
import { SearchResultsPublic } from '../../models/search-results-public.model';
import { SearchResultsRestricted } from '../../models/search-results-restricted.model';
import { SearchProvider } from '../../providers/search.provider';
import { SearchService } from '../../services/search.service';
import { Account } from './../../../account/models/account.model';
import { AuthService } from './../../../auth/services/auth.service';
import { PromotionsService } from './../../../promotions/services/promotions.service';
import { FilterItem } from './../../models/filter-item.model';

@Component({
    selector: 'search-results',
    templateUrl: './search-results.component.html',
    styleUrls: [
        './search-results.component.css'
    ],
    providers: [
        ConfirmationService,
        MessageService,
    ]
})
export class SearchResultsComponent extends ParentComponent implements OnInit, DoCheck {

    @Input()
    public hidePromotes: boolean = false;

    public resultsPromotePublic: SearchResultsPublic = null;
    public resultsPromoteRestricted: SearchResultsRestricted = null;

    public promotesForHeaderCarousel: Array<CompanyPromote> = [];
    public promotesForContactCarousel: Array<CompanyPromote> = [];
    public resultsPublic: Array<SearchResultPublic> = null;
    public resultsRestricted: Array<SearchResultRestricted> = null;

    public resultsPublicSave: Array<SearchResultPublic> = null;
    public resultsRestrictedSave: Array<SearchResultRestricted> = null;

    public userProfileSettings: UserProfileModalSettings = {
        display: false,
        parameters: {
            user: null,
            job: null
        },
        options: {
            writeMessage: false
        }
    } as UserProfileModalSettings;

    public writeMessageOptions: WriteMessageModalOptions = {
        display: false
    } as WriteMessageModalOptions;

    public messageSentConfirmationModalOptions: MessageSentConfirmationModalOptions = {
        display: false,
        success: null
    };

    public account: Account | null;

    public filtersJob: FilterItem[];
    public filtersCompany: FilterItem[];
    public filtersLocation: FilterItem[];

    public selectedFiltersJob: string[] = [];
    public selectedFiltersCompany: string[] = [];
    public selectedFiltersLocation: string[] = [];

    @Input()
    public scrollable: boolean = false;

    @ViewChild('arrowJob')
    public arrowJobElement: HTMLElement | any;

    @ViewChild('arrowCompany')
    public arrowCompanyElement: HTMLElement | any;

    private isInit = false;

    private countReset = 0;

    public constructor(
        private readonly authService: AuthService,
        private readonly accountService: AccountService,
        private readonly searchService: SearchService,
        private readonly promotionsService: PromotionsService,
        private readonly searchProvider: SearchProvider,
        private readonly userFavoritesProvider: UserFavoritesProvider,
        private readonly confirmationService: ConfirmationService,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initAccount();
    }

    public ngDoCheck(): void {
        if (R.isNil(this.account)) {
            this.account = this.accountService.get();
        }

        if (R.isNil(this.resultsPublic)
            && R.isNil(this.resultsRestricted)
        ) {
            this.load();
        }
    }

    public addToFavorite(
        userId: string,
        jobId: string
    ): void {
        if (!R.isNil(this.account)
            && !R.isNil(userId)
            && !this.account.isJobUserInFavorites(jobId)
        ) {
            this.userFavoritesProvider.add(
                this.mapFavoriteToCreateCommand(
                    this.account.id,
                    userId,
                    !R.isNil(jobId)
                        ? jobId
                        : null
                )
            ).subscribe(
                (response: any) => { },
                (error: any) => { },
                () => {
                    this.accountService.reload().then(
                        () => this.account = this.accountService.get()
                    );
                }
            );
        }
    }

    public removeFavorite(
        userId: string,
        jobId: string
    ): void {
        const favorite: AccountFavorite | null = this.account.getFavorite(
            userId,
            jobId
        );

        if (!R.isNil(favorite)) {
            this.userFavoritesProvider.remove(
                this.mapFavoriteToDeleteCommand(favorite)
            ).subscribe(
                (response: any) => { },
                (error: any) => { },
                () => {
                    this.accountService.reload().then(
                        () => this.account = this.accountService.get()
                    );
                }
            );
        }
    }

    public userProfileTo(
        user: User,
        jobUser: JobUser,
        promote: CompanyPromote = null
    ): void {
        this.userProfileSettings = {
            display: true,
            parameters: {
                user: user,
                job: jobUser
            },
            options: {
                writeMessage: this.authService.isLoggedIn()
            },
            promote: promote.isResultLineLogoActive ? promote : null
        } as UserProfileModalSettings;
    }

    public handleUserProfileEvent(
        event: string
    ): void {
        this.accountService.reload().then(
            () => {
                this.account = this.accountService.get();
                this.reloadAccount();
            }
        );
    }

    public writeMessageTo(
        userId: string
    ): void {
        this.writeMessageOptions = {
            display: true,
            userId: userId,
            conversationId: null
        } as WriteMessageModalOptions;
    }

    public handleWriteMessageEvent(
        event: string
    ): void {
        this.writeMessageOptions = {
            display: false
        } as WriteMessageModalOptions;

        switch (event) {
            case MessageEvents.SentOK:
                this.messageSentConfirmationModalOptions = {
                    display: true,
                    success: true
                };
                break;

            case MessageEvents.SentButError:
                this.messageSentConfirmationModalOptions = {
                    display: true,
                    success: false
                };
                break;

            case MessageEvents.NotSent:
            default:
                break;
        }
    }

    public userInResultIsOwner(
        userId: string
    ): boolean {
        return this.accountService.isUserIdAccount(
            userId
        );
    }

    public goToLogin(): void {
        this.confirmationService.confirm({
            message: `Vous devez vous connecter pour réaliser cette action.<br><br>Aller à la page de connection ?`,
            header: 'Se connecter',
            icon: 'fa fa-user-circleevent-o explorjob-orange',
            accept: () => {
                this.router.navigateByUrl('/login');
            },
            reject: () => null
        });
    }

    public backToRequest(): void {
        this.searchService.clearQuery();

        let backToRequestUrl = '/search/request';
        if (this.searchService.hasLocalisationSearchField()) {
            backToRequestUrl = backToRequestUrl.concat('/', this.searchService.getLocalisationSearchField().toLowerCase());
        }
        this.searchService.clearLocalisationSearchField();

        this.router.navigateByUrl(backToRequestUrl);
        this.searchService.clearQuery();
    }

    public sortAscendingByJob() {
        if (!R.isNil(this.resultsRestricted) && R.isNil(this.resultsPublic)) {
            this.resultsRestricted = this.resultsRestricted.sort(function (a, b) {
                return a.job.label.localeCompare(b.job.label);
            });
        }
        else if (R.isNil(this.resultsRestricted) && !R.isNil(this.resultsPublic)) {
            this.resultsPublic = this.resultsPublic.sort(function (a, b) {
                return a.job.label.localeCompare(b.job.label);
            });
        }

        this.arrowJobElement.nativeElement.style.visibility = 'visible';
        this.arrowCompanyElement.nativeElement.style.visibility = 'hidden';
    }

    public sortAscendingByCompany() {
        if (!R.isNil(this.resultsRestricted) && R.isNil(this.resultsPublic)) {
            this.resultsRestricted = this.resultsRestricted.sort(function (a, b) {
                return !R.isNil(a.job.company) ? a.job.company.localeCompare(b.job.company) : null;
            });
        }
        else if (R.isNil(this.resultsRestricted) && !R.isNil(this.resultsPublic)) {
            this.resultsPublic = this.resultsPublic.sort(function (a, b) {
                return !R.isNil(a.job.company) ? a.job.company.localeCompare(b.job.company) : null;
            });
        }

        this.arrowJobElement.nativeElement.style.visibility = 'hidden';
        this.arrowCompanyElement.nativeElement.style.visibility = 'visible';
    }

    public jobNoFoundFormUrl(): string {
        return CONFIG.explorJob.jobs.noFoundForm;
    }

    public filter() {
        if (!R.isNil(this.resultsRestricted) && R.isNil(this.resultsPublic)) {
            this.resultsRestricted = this.resultsRestrictedSave;

            if (this.selectedFiltersJob.length !== 0) {
                this.resultsRestricted = this.resultsRestricted.filter(item => {
                    return this.selectedFiltersJob.indexOf(item.job.label) !== -1;
                });
            }

            if (this.selectedFiltersCompany.length !== 0) {
                this.resultsRestricted = this.resultsRestricted.filter(item => {
                    return this.selectedFiltersCompany.indexOf(item.job.company) !== -1;
                });
            }

            if (this.selectedFiltersLocation.length !== 0) {
                this.resultsRestricted = this.resultsRestricted.filter(item => {
                    return this.selectedFiltersLocation.indexOf(item.user.localisationCity) !== -1;
                });
            }
        }
        else if (R.isNil(this.resultsRestricted) && !R.isNil(this.resultsPublic)) {
            this.resultsPublic = this.resultsPublicSave;

            if (this.selectedFiltersJob.length !== 0) {
                this.resultsPublic = this.resultsPublic.filter(item => {
                    return this.selectedFiltersJob.indexOf(item.job.label) !== -1;
                });
            }

            if (this.selectedFiltersCompany.length !== 0) {
                this.resultsPublic = this.resultsPublic.filter(item => {
                    return this.selectedFiltersCompany.indexOf(item.job.company) !== -1;
                });
            }

            if (this.selectedFiltersLocation.length !== 0) {
                this.resultsPublic = this.resultsPublic.filter(item => {
                    return this.selectedFiltersLocation.indexOf(item.user.localisationCity) !== -1;
                });
            }
        }
    }

    public reset() {
        this.selectedFiltersJob = [];
        this.selectedFiltersCompany = [];
        this.selectedFiltersLocation = [];

        if (!R.isNil(this.resultsRestricted) && R.isNil(this.resultsPublic)) {
            this.resultsRestricted = this.resultsRestrictedSave;
        }
        else if (R.isNil(this.resultsRestricted) && !R.isNil(this.resultsPublic)) {
            this.resultsPublic = this.resultsPublicSave;
        }

        if (this.countReset === 0) {
            this.arrowJobElement.nativeElement.style.visibility = 'hidden';
            this.arrowCompanyElement.nativeElement.style.visibility = 'hidden';
        }

        this.countReset++;
    }

    private async initAccount(): Promise<void> {
        this.account = await this.accountService.getAsync();
    }

    private reloadAccount(): void {
        setTimeout(() => {
            this.account = this.accountService.get();

            if (R.isNil(this.account)) {
                this.reloadAccount();
            }
        }, 2750);
    }

    private load(): void {
        if (this.searchService.hasQuery()) {
            if (this.authService.isLoggedIn()) {
                this.searchProvider.searchRestricted(
                    this.searchService.getQuery()
                ).subscribe(
                    (result: SearchResultsRestricted) => {
                        this.resultsPromoteRestricted = result;

                        this.resultsRestricted = R.sortBy(
                            R.prop('relevance') as any,
                            this.resultsPromoteRestricted.results
                        ).reverse();

                        if (!this.isInit) {
                            this.resultsRestrictedSave = this.resultsRestricted;
                            this.initFilters();
                            this.sortFilters();
                            this.isInit = true;
                        }

                        this.promotesForHeaderCarousel = this.resultsPromoteRestricted.promotes.filter(
                            (promote: CompanyPromote) => promote.isResultHeaderLogoActive
                        );

                        this.promotesForContactCarousel = this.resultsPromoteRestricted.promotes.filter(
                            (promote: CompanyPromote) => promote.isContactModalLogoActive
                        );

                        this.promotionsService.setPromotes(this.promotesForContactCarousel);
                    },
                    (error: any) => { },
                    () => { }
                );
            }
            else {
                this.searchProvider.searchPublic(
                    this.searchService.getQuery()
                ).subscribe(
                    (result: SearchResultsPublic) => {
                        this.resultsPromotePublic = result;

                        this.resultsPublic = R.sortBy(
                            R.prop('relevance') as any,
                            this.resultsPromotePublic.results
                        ).reverse();

                        if (!this.isInit) {
                            this.resultsPublicSave = this.resultsPublic;
                            this.initFilters();
                            this.sortFilters();
                            this.isInit = true;
                        }

                        this.promotesForHeaderCarousel = this.resultsPromotePublic.promotes.filter(
                            (promote: CompanyPromote) => promote.isResultHeaderLogoActive
                        );

                        this.promotesForContactCarousel = this.resultsPromotePublic.promotes.filter(
                            (promote: CompanyPromote) => promote.isContactModalLogoActive
                        );

                        this.promotionsService.setPromotes(this.promotesForContactCarousel);
                    },
                    (error: any) => { },
                    () => { }
                );
            }
        }
        else {
            this.router.navigateByUrl('/search/request');
        }
    }

    private mapFavoriteToCreateCommand(
        accountId: string,
        userId: string,
        jobId: string | null
    ): UserFavoriteCreateCommand {
        return new UserFavoriteCreateCommand(
            accountId,
            userId,
            !R.isNil(jobId)
                ? jobId
                : null
        );
    }

    private mapFavoriteToDeleteCommand(
        favorite: AccountFavorite
    ): UserFavoriteDeleteCommand {
        return new UserFavoriteDeleteCommand(
            favorite.id
        );
    }

    private initFilters() {
        let temp: string[] = new Array();
        if (!R.isNil(this.resultsRestricted) && R.isNil(this.resultsPublic)) {
            this.filtersJob = Array.from(
                this.resultsRestricted.map(result => {
                    return new FilterItem(result.job.label);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });

            temp = new Array();
            this.filtersCompany = Array.from(
                this.resultsRestricted.map(result => {
                    return new FilterItem(result.job.company);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });
            temp = new Array();
            this.filtersLocation = Array.from(
                this.resultsRestricted.map(result => {
                    return new FilterItem(result.user.localisationCity);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });
        }
        else if (R.isNil(this.resultsRestricted) && !R.isNil(this.resultsPublic)) {
            this.filtersJob = Array.from(
                this.resultsPublic.map(result => {
                    return new FilterItem(result.job.label);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });

            temp = new Array();
            this.filtersCompany = Array.from(
                this.resultsPublic.map(result => {
                    return new FilterItem(result.job.company);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });

            temp = new Array();
            this.filtersLocation = Array.from(
                this.resultsPublic.map(result => {
                    return new FilterItem(result.user.localisationCity);
                })
            ).filter(item => {
                if (temp.indexOf(item.label) === -1) {
                    temp.push(item.label);
                    return item;
                }
            });
        }
    }

    private sortFilters() {
        this.filtersJob.sort(function (a, b) {
            return a.label.localeCompare(b.label);
        });

        if (!R.isNil(this.filtersCompany)) {
            this.filtersCompany.sort(function (a, b) {
                return a.label.localeCompare(b.label);
            });
        }

        if (!R.isNil(this.filtersLocation)) {
            this.filtersLocation.sort(function (a, b) {
                return a.label.localeCompare(b.label);
            });
        }
    }
}
