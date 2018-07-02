// demo
// http://www.gtz.com:9025/
// repo for demo
// https://github.com/johntom/AureliaMaterializeKendo
// https://gist.run/?id=53582770b5d72003fe3969c740b8fb6e
// @inject(Router, TaskQueue)

import { version } from 'aurelia-kendoui-bridge';
// import { api } from '../Utils/api'
// import { AuthServiceGTZ } from '../services'
import { ApiService } from '../servicesApi'



// import $ from 'jquery';
import moment from 'moment';
import { inject } from 'aurelia-dependency-injection';

import { AppRouter } from 'aurelia-router';
import { ListViewModel } from '../list-view-model';
import { activationStrategy } from 'aurelia-router';

// export class AboutKTEMP {

@inject(AppRouter,ApiService)

// export class Aboutktemp extends ListViewModel {
export class Kendoexcel {

  data = [{
    text: 'All',
    value: '-1'
  }, {
    text: 'TYPE1',
    value: '1'
  }, {
    text: 'TYPE2',
    value: '2'
  }];
  dataI = [
    {
      text: 'Hackendsak',
      value: '1'
    }
    , {
      text: 'Paramus',
      value: '2'
    }
    , {
      text: 'Bcua',
      value: '3'
    }
    , {
      text: 'Bergen',
      value: '4'
    }, {
      text: 'Passaic',
      value: '5'
    }, {
      text: 'Sober',
      value: '6'
    }, {
      text: 'Clifton',
      value: '7'
    }, {
      text: 'NJWW',
      value: '8'
    }, {
      text: 'Maverick',
      value: '9'
    }
  ];



  constructor(router,api) {
    //   constructor(router) {
    // super('two', router);
    this.router = router;
    this.version = version;
    this.ss1;
    this.ss2;
    this.capColor = 1
     this.api = api
  }
  // startDatePicker = new Date('1-1-2016');
  // endDatePicker = new Date();

  search() {
    // this.datasource.read();
    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    let rt = 'grievances'
    this.router.navigate(rt + '?town=' + this.capColor + '&d1=' + s1 + '&d2=' + s2);

    // this.router.navigate(rt + '/' + this.capColor + '/' + s1 + '/' + s2);
    console.log('this.route ', this.route)
  }

  townChanged() {
    $(this.town)
      .toggleClass('town-1', this.capColor === '1')
      .toggleClass('town-2 ', this.capColor === '2')
      // .toggleClass('town-3', this.capColor === '3')
      // .toggleClass('town-4', this.capColor === '4')
      // .toggleClass('town-5 ', this.capColor === '5')
      // .toggleClass('town-6', this.capColor === '6')
      // .toggleClass('town-7', this.capColor === '7')
      // .toggleClass('town-8 ', this.capColor === '8')
      // .toggleClass('town-9', this.capColor === '9')
      .toggleClass('town-10', this.capColor === '-1')
    //this.datasource.read();
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior

  }

  activate(params, queryString, routeConfig) {

    // let d1 = params.d1
    // if (d1 === undefined) {
    //   this.capColor = 1
    //   this.ss1 = '1-1-2016'
    //   this.ss2 = '10-10-2016'
    // } else {
    //   this.capColor = params.town
    //   this.ss1 = params.d1
    //   this.ss2 = params.d2
    // }

  }


  afterAttached() {
    this.townChanged()
    // this.startDatePicker = new Date(this.ss1)
    // this.endDatePicker = new Date(this.ss2)

    kendo.jQuery(this.grid).kendoGrid({
      //jQuery(this.grid).kendoGrid({
      toolbar: ["excel"],
      excel: {
        fileName: "BRMex.xlsx",
        proxyURL: "//demos.telerik.com/kendo-ui/service/export",
        // filterable: true,
        allPages: true
      },
      excelExport:
      function (e) {
        //var rows = e.workbook.sheets[0].rows;
        //  var sheet = e.workbook.sheets[0];
        //  var savedTemplate = kendo.template(this.columns[8].template);
        //  var data = this.dataSource.view();

        var sheet = e.workbook.sheets[0];
        //var template = kendo.template(this.columns[8].template);
        sheet.rows[0].cells.push({ 'value': 'Saved Amt' })
        let startpos = 6// normal index of amt billed
        let regpos = 6
        for (var i = 1; i < sheet.rows.length; i++) {
          var row = sheet.rows[i];

          if (row.type === 'data') {
            let diff = row.cells[regpos].value - row.cells[regpos + 1].value
            console.log('diff ', diff)
            row.cells.push({ 'value': diff })
          }
        }
      },
      // excelExport:
      // function (e) {
      //   var rows = e.workbook.sheets[0].rows;

      //   for (var ri = 0; ri < rows.length; ri++) {
      //     var row = rows[ri];

      //     if (row.type == "group-footer" || row.type == "footer") {
      //       for (var ci = 0; ci < row.cells.length; ci++) {
      //         var cell = row.cells[ci];
      //         if (cell.value) {
      //           // Use jQuery.fn.text to remove the HTML and get only the text
      //           // must have a div or it blows
      //           cell.value = $(cell.value).text();
      //           // cell.value = cell.value;
      //           // Set the alignment
      //           cell.hAlign = "right";
      //         }
      //       }
      //     }
      //   }
      // },
      dataSource: {
        type: "json",
        transport: {
          //  type: "json",


          // read: "http://10.1.115.212:8080/api/v1/case/find/"
          read: 'http://jif.bergenrisk.com:8080/api/v1/case/findcontents/undefined/all'


        },
        ////  "template" : "TYPE2",
        ////     "type" : "TYPE2",
        ////     "link" : "c:\\scan\\TYPE2\\039.pdf",
        ////     "grievno" : "GRIEVANCE 3444 (1990-123)",
        ////     "subject" : "Salem Station",
        ////     "location" : "DENIAL OF ACCESS (H. SINGLETON)",
        ////     "filename" : "039",
        ////     "contents"

        // group: {
        //   field: "type", aggregates: [

        //     { field: "template", aggregate: "count" },
        //     { field: "type", aggregate: "count" }
        //   ]
        // },
        schema: {
          model: {
            fields: {

              template: { type: "string" }, // scan template
              type: { type: "string" }, // barcode insured
              // link: { type: "string" },workername  workeraddr workercity
              workername: { type: "string" },
              workeraddr: { type: "string" },
              workercity: { type: "string" },
              filename: { type: "string" },
              contents: { type: "string" },
              createdAt: { type: "date" },
              billedamt: {
                type: "number"
              },
              payamt: {
                type: "number"
              },
              completed: {
                type: 'boolean'
              },
              // contents: { type: "memo" }
            }
          }
        },
        pageSize: 12,

        // aggregate: [{ field: "type", aggregate: "count" },
        // { field: "template", aggregate: "count" }
        // ]
      },
      // setOptions:{
      sortable: {
        mode: "multiple",
        allowUnsort: true

      },

      // groupable: true,
      pageable: true,
      reorderable: true,
      resizable: true,
      columnMenu: true,
      filterable: {
        mode: "row"
      },
      scrollable: true,
      //  scrollable: false,
      // template: { type: "string" },
      // type: { type: "string" },

      // grievno: { type: "string" },
      // subject: { type: "string" },

      // location: { type: "string" },
      // filename: { type: "string" },
      // contents: {
      columns: [
        {
          field: "createdAt", title: "createdAt", width: "120px", locked: true, filterable: true,
          template: "#= kendo.toString(kendo.parseDate(createdAt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
        },

        { field: "template", title: "template", width: "200px", locked: true, filterable: { cell: { operator: "startswith" } } },
        {
          field: "type", width: "230px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Insured", type: "string",
          filterable: { cell: { operator: "startswith" } },
          //  aggregates: ["count"],

          // footerTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>",
          // groupFooterTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>"
        },
        { field: "completed", title: "completed", width: "165px" },
        { field: 'filename', width: "200px", title: "filename", filterable: true },

        // {
        //   field: "workername", title: "WorkerName", width: 230, locked: false, lockable: false,
        //   filterable: { cell: { operator: "contains" } }
        // },
        { field: 'workercity', width: "200px", title: "WorkerCity", filterable: { cell: { operator: "contains" } } },
        // { field: 'contents',  width: "200px", title: "contents", filterable: true },

        // {
        //   field: "contents", width: "250px", title: "search contents ...",
        //   template: `<div style='max-width:200px'>#= contents.substring(0,50) #</div>`,
        //   filterable: { cell: { operator: "contains" } }
        // },
        // {
        //   field: "filename", width: "100px", title: "PdfLink", filterable: false, columnMenu: false,
        //   template: `<a target='_blank' href="http://10.1.115.212:8080/api/v1/onepdf/#=template#/#=filename#.pdf">#=filename#.pdf</a>`
        // },
        // {
        //   field: "filename", width: "120px", title: "Pdf download", filterable: false,
        //   sortable: false, columnMenu: false,
        //   template: `<a target='_blank' href="http://10.1.115.212:8080/api/v1/downloadonepdf/#=template#/#=filename#.pdf">#=filename#.pdf</a>`
        // },

        // {
        //   field: "filename", width: "450px", title: "email link", filterable: false,
        //   sortable: false, columnMenu: false,
        //   template: `<div>http://10.1.115.212:8080/api/v1/onepdf/#=template#/#=filename#.pdf</div>`
        // },

        { field: 'billedamt', format: "{0:c2}", width: "100px", title: "Billed amt", attributes: { class: "numbers" }, filterable: { cell: { operator: "startswith" } } },
        { field: 'payamt', format: "{0:c2}", width: "100px", title: "Payamt amt", attributes: { class: "numbers" }, filterable: { cell: { operator: "startswith" } } },

        {
          field: null, format: "{0:c2}", width: "100px", columnMenu: false, attributes: { style: "text-align:right;" },
          title: "Saved Amt", template: '#= kendo.format("{0:c}", billedamt - payamt) #'
        },




        // {
        //   field: "filename", width: "450px", title: "email link", filterable: false,
        //   sortable: false, columnMenu: false,
        //   template: `<div>http://localhost:8080/api/v1/downloadonepdf/#=template#/#=filename#.pdf</div>`
        // },


      ]
    });
    this.grid = kendo.jQuery(this.grid).data('kendoGrid');

  }

  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  }


  loadGrid() {

    var options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }

  }
  saveGrid() {

    localStorage["kendo-grid-mail"] = kendo.stringify(this.grid.getOptions());
    alert("Saved to storage. Reload now and click the Load button")
  }
  loadData(town) {

    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let twos
    return this.api.findcase()
      .then((jsonRes) => {
        grievances = jsonRes
        console.log('this.twos ', grievances)
        return grievances

      })
  }
}