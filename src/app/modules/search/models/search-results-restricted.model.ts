import { CompanyPromote } from '../../promotions/models/company-promote.model';
import { SearchResultRestricted } from './search-result-restricted.model';

export class SearchResultsRestricted {
    public readonly results: Array<SearchResultRestricted>;
    public readonly promotes: Array<CompanyPromote>;
}
