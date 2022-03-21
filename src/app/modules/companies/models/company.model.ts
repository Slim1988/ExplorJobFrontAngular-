import { Coordinates } from '../../localization/models/coordinates.model';
import { CompanyDynamicField } from './company-dynamic-field.model';
import { CompanyMedias } from './company-medias.model';
import { CompanySocialNetworks } from './company-social-networks.model';
import { CompanyTexts } from './company-texts.model';

export class Company {
    public readonly id: string;
    public readonly name: string;
    public readonly activityArea: string;
    public readonly dynamicFields: Array<CompanyDynamicField>;
    public readonly websiteUrl: string;
    public readonly socialNetworks: CompanySocialNetworks;
    public readonly medias: CompanyMedias;
    public readonly coordinates: Coordinates;
    public readonly texts: CompanyTexts;
}
