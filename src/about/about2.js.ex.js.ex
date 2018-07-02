/*
demo
http://www.gtz.com:9025/
repo for demo
https://github.com/johntom/AureliaMaterializeKendo
https://gist.run/?id=53582770b5d72003fe3969c740b8fb6e
 */

import { api } from '../Utils/api'
import $ from 'jquery';
import moment from 'moment';
import { inject } from 'aurelia-dependency-injection';
// import {kendoUi} from 'kendo-ui';
import { AppRouter } from 'aurelia-router';
import { ListViewModel } from '../list-view-model';
import { activationStrategy } from 'aurelia-router';
@
  inject(AppRouter)
// export class kendoPTJQ2GROUP {
 export class About extends ListViewModel {
//  export class About {
  data = [{
    text: 'All',
    value: '-1'
  },{
    text: 'Hackensack',
    value: '1'
  }, {
    text: 'Paramus',
    value: '2'
  }, {
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
  },  {
    text: 'NJWW',
    value: '8'
  }, {
    text: 'Maverick',
    value: '9'
  }
  ];
// townChanged() {
//     $(this.cap)
//      .toggleClass('black-cap', this.capColor === '1')
//      .toggleClass('orange-cap', this.capColor === '2')
//      .toggleClass('grey-cap', this.capColor === '3');
//   }

 constructor(router) {
    super('two', router);
    this.statusText = 'turn box off'
    this.router = router;

    //this.route = route;
    this.ss1;
    this.ss2;
    // this.startDatePicker.value = '';
    //this.endDatePicker.value = '';
  }

townChanged() {
    $(this.town)
     .toggleClass('town-1', this.capColor === '1')
     .toggleClass('town-2 ', this.capColor === '2')
     .toggleClass('town-3', this.capColor === '3')
     .toggleClass('town-4', this.capColor === '4')
     .toggleClass('town-5 ', this.capColor === '5')
     .toggleClass('town-6', this.capColor === '6')
     .toggleClass('town-7', this.capColor === '7')
     .toggleClass('town-8 ', this.capColor === '8')
     .toggleClass('town-9', this.capColor === '9')
     .toggleClass('town-10', this.capColor === '-1')
    //  .toggleClass('town-2 ', this.capColor === '2')
    //  .toggleClass('town-3', this.capColor === '3');
     
  }
  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }
  //  reloadPage(){
  //   location.reload();
  // }
  loadGrid(e) {
    // $("#load").click(function (e) {
    // e.preventDefault();
    // //var options = localStorage["kendo-grid-options"];
    // //  localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
    // let options = localStorage.getItem('kendo-grid-options')//, kendo.stringify(this.grid.getOptions()) )
    // let name = localStorage.getItem('fname')
    // if (options) {
    //   this.grid.getOptions(JSON.parse(options));
    // }

  var options = localStorage["kendo-grid-options"];
    if (options) {
        this.grid.setOptions(JSON.parse(options));
    }

  }
  saveGrid(e) {

    localStorage["kendo-grid-options"] = kendo.stringify(this.grid.getOptions());
    alert("Saved to storage. Reload now and click the Load button");



 }


  afterAttached() {
    //alert ('this.ss1 '+this.ss1+this.ss2)

    this.startDatePicker = new Date(this.ss1)
    this.endDatePicker = new Date(this.ss2)
    // this.endDatePicker = new Date('5-5-2016')
    //     this.changeData()
    jQuery(this.grid).kendoGrid({
      toolbar: ["excel"],
      excel: {
        fileName: "BRMex.xlsx",
        proxyURL: "//demos.telerik.com/kendo-ui/service/export",
        // filterable: true,
        allPages: true
      },

      excelExport:
      function (e) {
        var rows = e.workbook.sheets[0].rows;

        for (var ri = 0; ri < rows.length; ri++) {
          var row = rows[ri];

          if (row.type == "group-footer" || row.type == "footer") {
            for (var ci = 0; ci < row.cells.length; ci++) {
              var cell = row.cells[ci];
              if (cell.value) {
                // Use jQuery.fn.text to remove the HTML and get only the text
                // must have a div or it blows
                cell.value = $(cell.value).text();
                // cell.value = cell.value;
                // Set the alignment
                cell.hAlign = "right";
              }
            }
          }
        }
      },
      dataSource: {
        type: "json",
        transport: {
          //  type: "json",
          //   read:"http://localhost:8080/api/v1/wc/test",
          read: "http://localhost:8080/api/v1/wc/test/"  +this.capColor+ "/" + this.ss1 + "/" + this.ss2  


          //read: this.loadData(),
          //data: this.loadData(),

        },
       
        group: {
          field: "claimtype", aggregates: [

            { field: "claimtype", aggregate: "count" },
            { field: "reservetotal", aggregate: "sum" },
            { field: "incurred", aggregate: "sum" },

            { field: "bodinjtodate", aggregate: "sum" },
            { field: "bodinjreserve", aggregate: "sum" },

            { field: "propdamgtodate", aggregate: "sum" },
            { field: "propdamgreserve", aggregate: "sum" },

            { field: "expensetodate", aggregate: "sum" },
            { field: "expensereserve", aggregate: "sum" },

            { field: "collisiontodate", aggregate: "sum" },
            { field: "collisionreserve", aggregate: "sum" },

            { field: "comprehensivetodate", aggregate: "sum" },
            { field: "comprehensivereserve", aggregate: "sum" },

          ]
        },
        schema: {
          model: {
            fields: {
              dol: { type: "date" },
              //'["loss year"]': { type: "string" },
              dept: { type: "string" },
              claimtype: { type: "string" },
              claimno: { type: "string" },
              expense: { type: "number" },
              dolyymm: { type: "string" },
              reservetotal: { type: "number" },
              incurred: { type: "number" },
              bodinjtodate: { type: "number" },
              bodinjreserve: { type: "number" },
              propdamgtodate: { type: "number" },
              propdamgreserve: { type: "number" },


              expensetodate: { type: "number" },
              expensereserve: { type: "number" },
              collisiontodate: { type: "number" },
              collisionreserve: { type: "number" },
              comprehensivetodate: { type: "number" },
              comprehensivereserve: { type: "number" },

              status: { type: "string" },
              worker: { type: "worker" },
              ld: { type: "string" }
            }
          }
        },
        pageSize: 12,

        aggregate: [{ field: "claimtype", aggregate: "count" },
        { field: "reservetotal", aggregate: "sum" },
        { field: "incurred", aggregate: "sum" },
        { field: "bodinjtodate", aggregate: "sum" },
        { field: "bodinjreserve", aggregate: "sum" },


        { field: "propdamgtodate", aggregate: "sum" },
        { field: "propdamgreserve", aggregate: "sum" },

        { field: "expensetodate", aggregate: "sum" },
        { field: "expensereserve", aggregate: "sum" },

        { field: "collisiontodate", aggregate: "sum" },
        { field: "collisionreserve", aggregate: "sum" },

        { field: "comprehensivetodate", aggregate: "sum" },
        { field: "comprehensivereserve", aggregate: "sum" }


        ]
      },
      // setOptions:{
      sortable: {
        mode: "multiple",
        allowUnsort: true
     
      },
      // sortable: true,
      groupable: true,
      pageable: true,
      reorderable: true,
      resizable: true,
      columnMenu: true,
      filterable: {
        mode: "row"
      },
      scrollable: true,
      //  scrollable: false,

      columns: [
        { field: "accountname", title: "AccountName", width: "150px", locked: true, filterable: false },
        {
          field: "claimtype", width: "150px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Claim Type", type: "number", format: "{0:0}", aggregates: ["count"],
          filterable: { cell: { operator: "startswith" } },
          footerTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>"
        },



        { field: "claimno", title: "ClaimNo", width: 130, locked: true, lockable: false, filterable: false },


        {
          field: "dol", title: "DOL", width: "120px", filterable: false,
          template: "#= kendo.toString(kendo.parseDate(dol, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
        },

        { field: '["worker"]', title: "Lastname[firstname]", filterable: false },



        { field: '["loss year"]', width: "100px", title: "loss year", filterable: false },
        { field: "dolyymm", width: "120px", filterable: { cell: { operator: "contains" } }, title: "DOL-YYMM" },

        {
          field: "reported", width: "150px", filterable: false,
          template: "#= kendo.toString(kendo.parseDate(reported, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
        },


        { field: '["loss description"]', width: "400px", title: "Loss Description", filterable: false },
        // { field: '["first name"]', title: "First", filterable: false },
        // { field: '["last name"]', title: "Last", filterable: false },

        // filterable: { cell: { operator: "contains" }}, width:"200px"   }  ,

        {
          field: "bodinjtodate", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Bodinjtodate", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },

        {
          field: "propdamgtodate", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Propdamgtodate", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        {
          field: "collisiontodate", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Collisiontodate", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },

        {
          field: "comprehensivetodate", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Comprehensivetodate", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        {
          field: "expensetodate", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Expensetodate", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        {
          field: "bodinjreserve", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Bodinj rsv", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },



        {
          field: "propdamgreserve", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Propdamg rsv", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },

        {
          field: "collisionreserve", filterable: false,
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Collision rsv", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },

        {
          field: "comprehensivereserve", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Comprehensive rsv", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        {
          field: "expensereserve", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "Expense rsv", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        // {
        //   field: "reservetotal", filterable: false, width:"200px",
        //   headerAttributes: { style: "text-align:right" },
        //   attributes: { class: "text-right" },
        //   title: "reservetotal", type: "number", format: "{0:c2}", aggregates: ["sum"],
        //   footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
        //   groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        // },

        {
          field: "incurred", filterable: false, width: "200px",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          title: "incurred", type: "number", format: "{0:c2}", aggregates: ["sum"],
          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"
        },
        { field: "dept", width: "400px" },
        { field: "status", width: "200px", filterable: { cell: { operator: "eq" } } }

      ]
    });
  }



  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  }
  startDatePicker = new Date('1-1-2016');
  endDatePicker = new Date();
  //  endDatePicker= new Date('3-3-2016');
 
  startChange() {

  }

  endChange() {

  }
  clearData() {

  }


  activate(params, queryString, routeConfig) {
    //  api.getLiability()
    //     .then((jsonRes) => {
    //       let twos = jsonRes
    //       return twos
    //     })
    let d1 = params.d1

    if (d1 === undefined) {
      this.capColor = 1 
      this.ss1 = '1-1-2016'
      this.ss2 = '10-10-2016'

    } else {
      this.capColor = params.town
      this.ss1 = params.d1
      this.ss2 = params.d2

    }

  }

  changeData() {

    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    let rt = 'two'// kendoPTJQ2GROUP'
    console.log('this.route ', this.route)
    //this.router.navigate(rt + '/1' + '?d1=' + s1 + '&d2=' + s2);
    this.router.navigate(rt + '?town='+this.capColor + '&d1=' + s1 + '&d2=' + s2);
  }
  loadData() {
    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    // api.getTWO(s1, s2)
    api.getLiability()
      .then((jsonRes) => {
        let twos = jsonRes
        console.log('this.twos ', twos)
        return twos
      })
  }


}

// footerTemplate: "<div style='float: right'>#= sum #</div>"

// footerTemplate: "<div style='text-align: right'>#= sum #</div>"

// footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"

//val | currencyFormat

export class CurrencyFormatValueConverter {
  toView(value) {
    return numeral(value).format('($0,0.00)');
  }

}
