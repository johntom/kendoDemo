import { bindable } from 'aurelia-framework';
import lodash from 'lodash';
import {  api} from '../Utils/api';

// export class DemoSearch{
//     private cars:string[];
//     private origialCars:string[];

//     @bindable search='';

//     constructor(){
//         this.cars = this.origialCars = ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota', 'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo', 'Cadillac', 'Chrysler', 'Dodge', 'Ford'];
//     }

//     searchChanged(value){
//         this.cars = this.origialCars.filter((item) => {
//             return item.toLowerCase().search(value.toLowerCase())==-1 ? false : true;
//         });
//     }
// }

export class DemoSearch {
    @bindable search;
    //  countryNameService = new CountryNameSuggestionService();
    //   countryName = null;

    //   countryService = new CountrySuggestionService();
    //   country = null;

    cars = [];
    origialCars = [];
    metacars = [];
   
    // selectedFiles=[]
    selectedFiles; // for upload
   
    // @bindable search='';

    constructor() {
        this.metacars = ['make', 'model']
        //  this.cars = this.origialCars = ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota', 'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo', 'Cadillac', 'Chrysler', 'Dodge', 'Ford'];
        this.cars = this.origialCars = [{ make: 'Honda', model: 'Civic' },
        { make: 'Lexus', model: 'es350' },
        { make: 'Mazda', model: '6' },
        { make: 'Nissan', model: 'z140' },
        { make: 'Toyota', model: 'Civic' },
        { make: 'Audi', model: 's90' },
        { make: 'BMW', model: 'x3' },
        { make: 'Mercedes', model: '450' },
        { make: 'Volkswagen', model: 'jetta' },
        { make: 'Volvo', model: 'x90' },
        { make: 'Cadillac', model: 'c10' },
        { make: 'Chrysler', model: 'lebaron' },
        { make: 'Dodge', model: 'hatch' },
        { make: 'Ford', model: 'mustang' }]
    }



    searchChanged(value) {
        this.cars = this.origialCars.filter((item) => {
            //     for (var i = 0, len = this.metacars.length; i < len; i++) {
            for (let i in this.metacars) {
                let md = this.metacars[i]
                // console.log('key  ',md, item[md]) md = make or model
                // only return match true cause it wont loop if it does either true or false
                if (item[md].toLowerCase().search(value.toLowerCase()) != -1) return true
            }

          

        });
    }


doUpload() {
    console.log( this.selectedFiles[0])
    // alert(this.selectedFiles[0])
      //  return api.upload('api/v1/uploadcsv', {}, this.selectedFiles[0]).then(() => this.clearFiles());
       return api.upload('api/v1/uploadcsv', {}, this.selectedFiles).then(() => this.clearFiles());
        
    }

     clearFiles() {
        document.getElementById("files").value = "";
    }




    searchChanged2(value) {
        this.cars = this.origialCars.filter((item) => {
  //    lodash.forEach(item, function (val, key) {
            //         console.log('cant get lodash to work alue val key   ',value,val, key, val.toLowerCase().search(value.toLowerCase()) )//,item[key]) 
            //         //let md = this.metacars[key]
            //           // only return match true cause it wont loop if it does either true or false
            //         // return val.toLowerCase().search(value.toLowerCase()) !=-1 ?   true  : false;
            //          if ( val.toLowerCase().search(value.toLowerCase()) != -1) {
            //               return true
            //          }
            //     });

            // return item.make.toLowerCase().search(value.toLowerCase())==-1 ? false : true;
            // return item.make.toLowerCase().search(value.toLowerCase())==-1 ? false : true;
            //  lodash.forEach(item, function (val, key) {
            //              // alert(val+' '+key)
            //               return val.toLowerCase().search(value.toLowerCase()) !=-1 ?   true  : false;
            //             });


            // for (let key in this.metacars) {
            console.log('this.metacars  ', this.metacars)
            for (var i = 0, len = this.metacars.length; i < len; i++) {
                //     alert(item[i]);
                //   console.log(item[key] +' '+key)
                let md = this.metacars[i]
                console.log('key  ', md, item[md])

                if (item[md].toLowerCase().search(value.toLowerCase()) != -1) return true
                //  {
                // return true;
                // }
                //        return item[key].toLowerCase().search(value.toLowerCase()) != -1 ? true : false;
                //  if( item[md].toLowerCase().search(value.toLowerCase() ) !=-1 ){
                //      return true
                //  } 

            }



            //  return  ( (item.make.toLowerCase().search(value.toLowerCase())!=-1) ||  (item.model.toLowerCase().search(value.toLowerCase())!=-1)) ? true  : false 


            // for (let key in item) {
            //      console.log(item[key] +' '+key)
            //     // if (item[key] !== filterObject[key]) {
            //     //   //return false;
            //     // }
            //     return item[key].toLowerCase().search(value.toLowerCase()) != -1 ? true : false;
            // }


            // 
            // for (var i = 0, len = item.length; i < len; i++) {
            //     alert(item[i]);
            // }
            // alert(val.toLowerCase().search(value.toLowerCase()) !=-1 ?   true  : false);

        });
    }
}
// for (let val of item) {
//     console.log(val)
//         //   return val.toLowerCase().search(value.toLowerCase()) !=-1 ?   true  : false;
//         }

//         });
//     }



//   searchChanged(value) {
//         this.cars = this.origialCars.filter((cars) => {
//             // return item.make.toLowerCase().search(value.toLowerCase())==-1 ? false : true;
//             // return item.make.toLowerCase().search(value.toLowerCase())==-1 ? false : true;
//             return  ( (item.make.toLowerCase().search(value.toLowerCase())!=-1) ||  (item.model.toLowerCase().search(value.toLowerCase())!=-1)) ? true  : false 

//             // lodash.forEach(cars, function (val, key) {
//             //     //console.log(value, val, val.toLowerCase().search(value.toLowerCase()) ,val.toLowerCase().search(value.toLowerCase()) !== -1) //cars , val, key);
//             //     return val.toLowerCase().search(value.toLowerCase()) !=-1 ?   true  : false;

//             // });
//         });
//     }