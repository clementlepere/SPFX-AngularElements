export class MockPeoplePickerService {

    getOnlyPersonPeoplePicker(): Promise<any[]> {
        let returnData = [{ "Id": 1, "Name": "test" }];
       return Promise.resolve(returnData);
    }
}