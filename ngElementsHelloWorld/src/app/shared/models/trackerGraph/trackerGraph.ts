export class TrackerGraph {

    public openSum: number;
    public closeSum: number;


    public priority_1: number;
    public priority_2: number;
    public priority_3: number;
    public priority_4: number;
    public priority_5: number;
    public priority_none: number;

    constructor(open: number, close: number, p1: number, p2: number, p3: number, p4: number, p5: number, pnone: number) {
        this.openSum = open;
        this.closeSum = close;

        this.priority_1 = p1;
        this.priority_2 = p2;
        this.priority_3 = p3;
        this.priority_4 = p4;
        this.priority_5 = p5;
        this.priority_none = pnone;

    }
}
