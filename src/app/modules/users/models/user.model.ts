import { UserContactInformation } from './user-contact-information.model';
import { UserContactMethod } from './user-contact-method.model';
import { UserDegree } from './user-degree.model';
import { UserProfessionalSituation } from './user-professional-situation.model';

export class User {
    public readonly id: string;
    public readonly photoUrl: string|null;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly birthDate: Date|null;
    public readonly localisationCity: string|null;
    public readonly presentation: string;
    public readonly isProfessional: boolean;
    public readonly lastDegree: UserDegree|null;
    public readonly professionalSituation: UserProfessionalSituation|null;
    public readonly currentCompany: string|null;
    public readonly currentSchool: string|null;
    public readonly contactMethods: Array<UserContactMethod>;
    public readonly contactInformations: Array<UserContactInformation>;
}
