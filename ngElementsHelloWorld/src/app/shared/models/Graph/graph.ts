export class Graph {


    public labels: string[];
    public title: string;
    public data: number[];

    constructor(lab: string[], title: string, data: number[]) {

        this.labels = lab;
        this.title = title;
        this.data = data;

    }
}
