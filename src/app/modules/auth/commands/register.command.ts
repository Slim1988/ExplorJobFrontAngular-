import { environment } from '../../../../environments/environment';

export class RegisterCommand {
    public readonly email: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly birthDate: Date;
    public readonly password: string;
    public readonly isProfessional: boolean;
    public readonly contractIds: Array<string>;
    public readonly fallbackUrl: string;
    public readonly zipCode: string;

    public constructor(
        email: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        password: string,
        isProfessional: boolean,
        contractIds: Array<string>,
        zipCode: string
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.password = password;
        this.isProfessional = isProfessional;
        this.contractIds = contractIds;
        this.fallbackUrl = `${ environment.app.host }/#/confirm-email`;
        this.zipCode = zipCode;
    }
}
