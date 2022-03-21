import { CompanyPromote } from '../../promotions/models/company-promote.model';
import { SearchResultPublic } from './search-result-public.model';

export class SearchResultsPublic {
    public readonly results: Array<SearchResultPublic>;
    public readonly promotes: Array<CompanyPromote>;
}
