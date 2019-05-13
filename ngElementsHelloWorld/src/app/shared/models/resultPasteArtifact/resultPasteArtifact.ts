export class ResultPasteArtifact {


    artifactid: string;
    errorData: string;
    isError: boolean;

    constructor(artifactid, errorData, isError) {
        this.artifactid = artifactid;
        this.errorData = errorData;
        this.isError = isError;
    }

}
