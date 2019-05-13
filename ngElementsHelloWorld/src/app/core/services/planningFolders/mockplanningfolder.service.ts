export class MockPlanningFolderService {
    // public getAllPlanningFolder(): Promise<any> {
    //     return Promise.resolve([]);
    // }
    public getAllPlanningFolder(): Promise<any> {
        let inputData = {
            ID: 1,
            name: "name",
            openclose: "close",
            total: 100,
            planningfolderId: 1,
            active: true,
            openpriority: 1,
            EstimatedEffort: 2,
            RemaingEffort: 1,
            ActualEffort: 4,
            SumPoint: 1,
        };
        return Promise.resolve(inputData);
    }

    pastePlanningFolder(idPlanningFolder: string, idParentPlanningFolder: string): Promise<any> {
        return Promise.resolve(true);
    }
    deletePlanningFolder(idPlanningFolder: string): Promise<boolean> {
        return Promise.resolve(true);
    }
    getPlanningFolderById(planningFolderId: string): Promise<any[]> {
        return Promise.resolve([]);

    }
}
