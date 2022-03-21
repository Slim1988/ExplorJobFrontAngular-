export class AccountSituationInformationsUpdateCommand {
    public readonly id: string;
    public readonly lastDegreeId: string;
    public readonly professionalSituationId: string;
    public readonly currentCompany: string;
    public readonly currentSchool: string;

    public constructor(
        id: string,
        lastDegreeId: string,
        professionalSituationId: string,
        currentCompany: string,
        currentSchool: string
    ) {
        this.id = id;
        this.lastDegreeId = lastDegreeId;
        this.professionalSituationId = professionalSituationId;
        this.currentCompany = currentCompany;
        this.currentSchool = currentSchool;
    }
}
