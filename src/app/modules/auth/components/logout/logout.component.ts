import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'logout',
    template: ''
})
export class LogoutComponent extends ParentComponent implements OnInit {
    public constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.authService.logout();
    }
}
