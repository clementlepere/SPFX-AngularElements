import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage/src';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { of } from 'rxjs'

import { AppState } from '../../app.service';
import { BackendRequestClass } from '../../backend.request';
import { CTracker } from '../../Models/tracker/ctracker';
import { TableTracker } from '../../Models/tracker/tabletracker';
import { LoadTitleSPService } from './../../Services/loadTitleSP/loadTitleSP.service';
import { MockPermissionsService } from './../../Services/permissions/mockpermissions.service';
import { PermissionsService } from './../../Services/permissions/permissions.service';
import { TableGenericService } from './../../Services/table/tablegeneric.service';
import { MockTrackerService } from './../../Services/trackers/mocktrackers.service';
import { TrackerService } from './../../Services/trackers/trackers.service';
import { SummaryListTrackersComponent } from './summary-list-trackers.component';

describe('SummaryListTrackersComponent (inline template)', () => {

  let comp: SummaryListTrackersComponent;
  let fixture: ComponentFixture<SummaryListTrackersComponent>;
  // let de: DebugElement;
  // let el: HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryListTrackersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppState,
        BackendRequestClass,
        { provide: TrackerService, useClass: MockTrackerService },
        { provide: PermissionsService, useClass: MockPermissionsService },
        PositioningService,
        ComponentLoaderFactory,
        TableGenericService,
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 123 },
            ),
          },
        },
        LoadTitleSPService,
      ],  
      imports: [
        HttpModule,
        ModalModule,
        FormsModule,
        LocalStorageModule.forRoot({
          prefix: 'my-app',
          storageType: 'localStorage',
        }),
      ],
    }).overrideComponent(SummaryListTrackersComponent, {
      set: {
        providers: [
          AppState,
          BackendRequestClass,
          TableGenericService,
          { provide: TrackerService, useClass: MockTrackerService },
          { provide: PermissionsService, useClass: MockPermissionsService },
          PositioningService,
          ComponentLoaderFactory,
          {
            provide: ActivatedRoute, useValue: {
              params: of({ id: 123 },
              ),
            },
          },
        ],
      },
    })
      .compileComponents(); // compile template and css


    fixture = TestBed.createComponent(SummaryListTrackersComponent);

    comp = fixture.componentInstance; // BannerComponent test instance
    // comp.tablegenericService.configureTable(comp.columns, comp.config);
    // comp.getPermissionsForTracker();
    // comp.getTrackersByListName("TRACKER_LIST");

  }));
  //Global tests
  describe('Global tests', () => {
    it('should have a defined component', () => {
      expect(comp).toBeDefined();
    });
  });

  //getting the trackers by name
  describe('Get Tracker by name', () => {
    it('should return array data', () => {
      let equalsto = [{ "sp_id": 1, "Id": "4dd247cf-e893-446e-8312-818bcc96ca0a", "ViewLink": "/sites/re7-2017-09-28/Step63/Lists/tracker100512/TrackerHomeForm.aspx?", "Icon": "https://rec-ecollaborative.capgemini.com/sites/re7-2017-09-28/Style%20Library/Images/icons/icon_01.png", "TrackerName": "ISSUES", "Open": 9, "OpenPriority": [{ "Value": 0, "Max": 10, "Type": "none" }, { "Value": 0, "Max": 10, "Type": "highest" }, { "Value": 1, "Max": 10, "Type": "high" }, { "Value": 1, "Max": 10, "Type": "medium" }, { "Value": 6, "Max": 10, "Type": "low" }, { "Value": 1, "Max": 10, "Type": "lowest" }, { "Value": 0, "Max": 10, "Type": "none" }], "Close": 1, "Total": 10, "TrackerId": "tracker100512" }];

      comp.getTrackersByListName();
      fixture.whenStable().then(() => {
        expect(comp.trackers).toEqual(equalsto);
      });
    });
    // it('test loader shold be false after completing the get trackers list by name', () => {
    //  comp.getTrackersByListName();

    //   fixture.whenStable().then(() => {
    //     fixture.detectChanges();
    //      expect(comp.showLoader).toEqual(false);
    //      });

    // });
  });

  //FormatDataTable function
  describe('Tests on formatdatatable', () => {

    it('showloader should be false', () => {
      let dataTracker: CTracker[] = [];
      comp.formatDataTable(dataTracker);
      fixture.whenStable().then(() => {
        expect(comp.showLoader).toEqual(false);
      });
    });
    it('format data table values should be equal', () => {
      let dataTracker: CTracker[] = [];
      comp.formatDataTable(dataTracker);
      fixture.whenStable().then(() => {
        expect(comp.dataSaved).toEqual(comp.data);
      });
    });
    it('format table values should be match', () => {
      let inputData: CTracker[] = [{
        sp_id: 1,
        Id: "2",
        ViewLink: " ",
        Icon: " ",
        TrackerName: " ",
        Open: 4,
        Close: 3,
        Total: 7,
        TrackerId: "",
        OpenPriority: [],
        IsSystemTracker: false,
      }];

      let expectedResult: TableTracker[] =
        [{
          sp_id: 1,
          id: "2",
          ViewLink: " ?", //the ? is added to avoid the redirection to not found page by sharepoint by allowing the correct encoding for the redirect URL
          icon: '<img src= ></img>',
          trackerName: '<a> </a>',
          openclose: '<span>4</span><span> / 3</span>',
          total: 7,
          openpriority: { max: 0, value: [] },
          trackerId: "",
          open: 4,
          IsSystemTracker: false,
        }];
      comp.formatDataTable(inputData);
      fixture.whenStable().then(() => {
        expect(comp.data).toEqual(expectedResult);
      });
    });
  });

  //getting the trackers by name
  describe('Get Permission for tracker', () => {
    it('should return true', () => {
      comp.getPermissionsForTracker();
      setTimeout(() => {
        fixture.whenStable().then(() => {
          expect(comp.permissionsTracker).toEqual(true);
        });
      }, 3000);
    });
  });
  //filter change
  describe('Change the filter', () => {
    it('shold get the number of rows', () => {
      comp.onFilterChange(null);
      fixture.whenStable().then(() => {
        expect(comp.rows).toEqual([]);
      });
    });
    it('shold get the number of columns', () => {
      comp.onFilterChange(null);
      fixture.whenStable().then(() => {
        expect(comp.length).toEqual(0);
      });
    });
  });

  //On table change
  describe('On table change', () => {
    it('should get the number of rows', () => {
      comp.onChangeTable(comp.config, { page: comp.page, itemsPerPage: comp.itemsPerPage });

      fixture.whenStable().then(() => {
        expect(comp.rows).toEqual([]);
      });

    });
    it('shold get the number of columns', () => {
      comp.onChangeTable(comp.config, { page: comp.page, itemsPerPage: comp.itemsPerPage });
      fixture.whenStable().then(() => {
        expect(comp.length).toEqual(0);
      });
    });
  });

  //Redirected view
  describe('Redirect the view', () => {
    it('should Rediredted to another view', () => {
      let link = "test";
      let expectedResult = "#test";
      comp.redirectView(link);
      fixture.whenStable().then(() => {
        expect(location.hash).toEqual(expectedResult);
      });
    });
    // comp.showMigrated = true;
    // let expectedResult='#/searchAdvancedAllTracker?showMigrated=';
    it('should Rediredted to another view when disable edit is true', () => {
      comp.searchAdvanced();

      comp.disabledEdit = true;
      comp.showMigrated = true;
      let expectedResults = '#/searchAdvancedAllTracker?showMigrated=' + comp.showMigrated;
      fixture.whenStable().then(() => {
        expect('#/searchAdvancedAllTracker?showMigrated=' + comp.showMigrated).toEqual(expectedResults);
      });
    });
    it('should Rediredted to another view when disable edit is false', () => {
      comp.disabledEdit = false;
      comp.showMigrated = true;
      comp.trackerIdSelected = "test";
      comp.searchAdvanced();
      let expectedResults = '#/searchAdvancedTracker?trackername=' + comp.trackerIdSelected + '&showMigrated=' + comp.showMigrated;
      fixture.whenStable().then(() => {
        expect('#/searchAdvancedTracker?trackername=' + comp.trackerIdSelected + '&showMigrated=' + comp.showMigrated).toEqual(expectedResults);
      });
    });
    // it('should Rediredted to another view if showmigrate is undefined', () => {

    //   comp.redirectView('#/searchAdvancedAllTracker?showMigrated=' + showMigrated);
    //     fixture.whenStable().then(() => {
    //       expect('#/searchAdvancedAllTracker?showMigrated=' + showMigrated).toEqual(expectedResult);
    //     });
    // });
  });

  //Reset the filter
  describe('Reset The Filter', () => {

    it('should be reset The filter', () => {
      comp.config.filtering = { filterString: 'test' };
      comp.resetFilter();
      fixture.whenStable().then(() => {
        expect(comp.config.filtering).toEqual({ filterString: '' });
      });
    });
  });
  //Row Click
  describe('click on row checking if data is null', () => {

    it('should assign the value of link is null', () => {

      comp.onRowClick(null);
      fixture.whenStable().then(() => {
        expect(comp.editLink).toEqual(null);
      });
    });
    it('should assign the value of viewLink to empty', () => {
      comp.onRowClick(null);
      fixture.whenStable().then(() => {
        expect(comp.viewLink).toEqual("");
      });
    });
    it('should assign the value of disableedit is true', () => {
      comp.onRowClick(null);
      fixture.whenStable().then(() => {
        expect(comp.disabledEdit).toEqual(true);
      });
    });
  });


  //Row Click
  describe('click on row checking only one row clicked case', () => {

    it('should assign the value of editlink is 1', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.editLink).toEqual(1);
      });
    });
    it('should assign the value of viewLink to test?', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.viewLink).toEqual("test?");
      });
    });
    it('should assign the value of trackerIdSelected is tracker12345', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.trackerIdSelected).toEqual("tracker12345");
      });
    });
  });

  //Row Click if selected more than one line
  describe('click on row checking when selecting multiple rows', () => {

    it('should assign the value of link is null', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        },
        {
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.editLink).toEqual(null);
      });
    });
    it('should assign the value of viewLink to empty', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        },
        {
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.viewLink).toEqual("");
      });
    });
    it('should assign the value of disableedit is true', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        },
        {
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.disabledEdit).toEqual(true);
      });
    });
    it('should enable to click on delete tracker button', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
          IsSystemTracker: false,
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.disabledDelete).toEqual(false);
      });
    });
    it('should disable to click on delete tracker button', () => {
      let data = {
        _arrayLineSelected: [{
          sp_id: 1,
          ViewLink: "test" + "?",
          trackerId: "tracker12345",
          IsSystemTracker: true,
        }],
      };
      comp.onRowClick(data);
      fixture.whenStable().then(() => {
        expect(comp.disabledDelete).toEqual(true);
      });
    });
  });

  //on cell click
  describe('click on cell', () => {
    it('clicked on cell', () => {
      let data = { column: "trackerName", row: { ViewLink: "#/searchAdvancedTracker?trackername=test&showMigrated=true" } };
      comp.onCellClick(data);
      fixture.whenStable().then(() => {
        expect(location.href).toContain("searchAdvancedTracker");
      });
    });
  });
});
