export class Package {

    Id: string;
    NbRelease: number;
    Description: string;
    Name: string;
    justName: string;
    Lastest: {
        Id: string;
        Name: string;
        Maturity: string;
        Date: string;
        CreatedBy: string;
        ReleaseFolder: string
    };

    constructor(Id: string, Name: string, NbRelease: number, Desc: string, RId: string, RName: string, RMaturity: string, RDate: string, RCreatedBy: string, justName: string, RReleaseFolder: string) {

        this.Id = Id;
        this.Name = Name;
        this.NbRelease = NbRelease;
        this.Description = Desc;

        this.Lastest = {
            Id: RId,
            Name: RName,
            Maturity: RMaturity,
            Date: RDate,
            CreatedBy: RCreatedBy,
            ReleaseFolder: RReleaseFolder,
        };
        this.justName = justName;
    }

}


