
import { version } from 'aurelia-kendoui-bridge';
import { inject } from 'aurelia-dependency-injection';

import { AppRouter } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';


@inject(AppRouter)
export class Redirect {

  constructor(router) {
    this.router=router
    // let rt2 = 'users'
    //   router.navigate(rt2);
  }
// activate(params, queryString, routeConfig) {
 
 activate(params){
 let rt = params.route

//  alert(rt22)
// let rt2 = 'users'
if (rt==='liability') {
let town = params.town
     let s1 = params.d1
      let s2 = params.d2
      let s3 =   params.d3
//     this.router.navigate(rt2 + '?route=liability&town=' + this.capColor + '&d1=' + s1 + '&d2=' + s2);
 this.router.navigate(rt+'?town=' + town + '&d1=' + s1 + '&d2=' + s2+ '&d3=' + s3);

    // this.router.navigate(rt);
} else {
  this.router.navigate(rt);

}
 }
}
