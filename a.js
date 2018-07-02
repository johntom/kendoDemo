import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";


// @inject(ApiService, ApplicationService, MyDataService)
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  items = [];
  origItems = [];

  //  console.log(' inv SearchResults ');
  message = 'Hello Claim 100!';
  dataSource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((code) => {
            console.log(' inv datasource ', code.length);// inv[0]);
            options.success(code);
          });
      },
      update: (options) => {
        //console.log('updateDataoptions ')
        let updatedItem = options.data;
        console.log('   updatedItem ', updatedItem)
        this.updateData(updatedItem)
          .then((scans) => {
            options.success(scans)
            if (scans.data === 'alreadyComplete') {
              alert('record was completed no updates allowed...')
              //   this.toast.show('record was completed no updates allowed!', 4000);
            }
            this.dataSource.read()
          })
         options.success()
       },
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          inactive: {
            type: 'boolean'
          }
        }
      }
    },
    pageSize: 12,

  })


   dataSource = new kendo.data.DataSource({
        transport: {
            read: (options) => {
                //  this.loadData(this.capColor, this.prevtown)
                this.loadData()
                    .then((scans) => {
                        // console.log('   scans ', scans[0])
                        options.success(scans)

                    })

            },

            destroy: (options) => {

                let updatedItem = options.data;
                console.log('   updatedItem ', updatedItem)
                this.deleteData(updatedItem)
                    .then((scans) => {
                        options.success(scans)
                        this.dataSource.read()
                    })
                options.success()
            },
            update: (options) => {
                //console.log('updateDataoptions ')




                let updatedItem = options.data;
                console.log('   updatedItem ', updatedItem)
                this.updateData(updatedItem)
                    .then((scans) => {
                        options.success(scans)
                        if (scans.data === 'alreadyComplete') {
                            alert('record was completed no updates allowed...')
                            //   this.toast.show('record was completed no updates allowed!', 4000);
                        }
                        this.dataSource.read()
                    })
                options.success()
            }
        },
        filter: { field: "completed", operator: "eq", value: false },

        // filter: { field: "assigntoStaffName", operator: "isnull",value:"isnull" },

        schema: {
            model: {
                //        id: "id", // Must assign id for update to work
                id: "_id", // if useing native then change id to _id        
                fields: {

                    template: {
                        type: "string",
                        readonly: true
                    }, //[name="firstName"]').attr("readonly", true); scan template ,IsNotEditable: true
                    type: {
                        type: "string"
                    }, // barcode insured
                    workername: {
                        type: "string"
                    },
                    workeraddr: {
                        type: "string"
                    },
                    workercity: {
                        type: "string"
                    },
                    filename: {
                        type: "number"
                    },
                    contents: {
                        type: "string"
                    },
                    createdAt: {
                        type: "date"
                    },
                    billedamt: {
                        type: "number"
                    },
                    payamt: {
                        type: "number"
                    },
                    assignto: { defaultValue: { staffid: 100, StaffName: 'Dittemer, Jennifer' } },
                    completed: {
                        type: 'boolean'
                    },
                    StaffName: {
                        type: "string",
                        editable: false
                    },
                    workername2: function () {
                        return 'jrt'//this.workeraddr + " " + this.workercity;
                    },
                    // Calculated field
                    savedamt: function () {
                        // (item) return (this.get("billedamt") - this.get("payamt"))
                        return (this.billedamt - this.payamt)
                        //   type: "number",
                        //return 100 //(100-50)
                    },
                }
            }
        },
        pageSize: 10,
        sort: { field: 'filename', dir: 'asc' },
        
    })





  constructor(router, api, utilService, appService, dataService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
  }
  updateData(e) {
    console.log('in updateData ', e)
    return [{ data: 'all' }]
    return this.api.updateccode(e)
        .then((jsonRes) => {
            console.log('this.scans ', jsonRes)
            return jsonRes
        })
  }
  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 


    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.dataSource.read()
  }

  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }

  loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let code;

    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {

      return Promise.all([
        this.dataService.loadCodes(this.queryParams)

      ]).then(values => {
        this.origItems = values[0]//.data;
        code = this.origItems;
        console.log('code ', code.length)
        return code
        //bad   this.currentItem = this.items.find(f => f.id == params.id);
      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });

      // claim = this.origItems;

    }
  }
  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

  }
  performRefresh() {
    console.log('performRefresh ')
    alert('You have selected performRefresh')
    this.appService.searchDataLoaded = false;
    this.dataSource.read()
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.appService.currentCode = dataItem
    let rt2 = '#/code/data/' + dataItem.CODE_ID;
    console.log('search-results:details', rt2);
    this.router.navigate(rt2);
  }

  addCode() {
    let rt2 = '#/code/dataadd';
    this.router.navigate(rt2);
  }

}

