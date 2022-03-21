import { HttpHeaders } from '@angular/common/http';
import * as R from 'ramda';
import { environment } from '../../../environments/environment';
import { API_ROUTES } from '../../config/api-routes';
import { CONFIG } from '../../config/config';

export abstract class ParentProvider {
    protected apiRoutes = API_ROUTES;

    protected httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders(CONFIG.http.options.headers)
    };

    protected retryMethodGet: number = CONFIG.http.resilience.retry.methods.get;
    protected retryMethodPost: number = CONFIG.http.resilience.retry.methods.post;
    protected retryMethodPut: number = CONFIG.http.resilience.retry.methods.put;
    protected retryMethodDelete: number = CONFIG.http.resilience.retry.methods.delete;

    protected url(
        contextUrl: string,
        param: string = null
    ): string {
        return `${
            environment.api.host
        }/api/${
            contextUrl
        }${
            !R.isNil(param)
                ? `/${ param }`
                : ''
        }`;
    }

    protected handleError = (
        error: any,
        caught: any
    ): never => {
        throw error;
    }
}
