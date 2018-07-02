import { ListViewModel } from '../list-view-model'
import { inject, singleton } from 'aurelia-dependency-injection'
import { Router } from 'aurelia-router'

import { UserService } from './user-service'
// import { api } from '../Utils/api'
import { ApiService } from '../servicesApi'
import { AuthServiceGTZ } from '../services'
import { activationStrategy } from 'aurelia-router';


@inject(Router, AuthServiceGTZ, ApiService)
export class UserList {
  // constructor (router, service,AuthServiceGTZ ) {
  constructor(router, authgtz, api) {
   
        if (authgtz.user === '') {

            this.router.navigate("login")

        }
    this.authgtz = authgtz;
    this.router = router;
    this.api = api 
  }

  activate(params, route) {
      

      
    }
   
  //  alert('never makes it')
    // this.routeConfig = routeConfig;
    // let d1 = params.refresh
    // // alert(params + ' params  ' + d1)
    // if (d1 === '1') {
    //   console.log(' params  ' + d1)
    //   this.users = []
    //   this.loadData()
    // }
 //}
  // activate(params, routeConfig) {
  //   this.routeConfig = routeConfig;
  //   let d1 = params.refresh
  //   // alert(params + ' params  ' + d1)
  //   if (d1 === '1') {
  //     console.log(' params  ' + d1)
  //     this.users = []
  //     this.loadData()
  //   }
  // }
  attached() {
    this.loadData()

  }
  afterAttached() {
    alert('afterAttached never makes it')
  }
  refresh() {
    //    this.loadData()
    let rt = '#/users'
    //  this.router.navigate(rt);
   // this.router.navigateToRoute(rt);
    this.router.navigate(rt)

  }
  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior

  }



  loadData() {
    let users
    return this.api.findusers()
      .then((jsonRes) => {
        this.users = jsonRes
        console.log('this.users ', this.users)
        //this.select(this.users[0])
        return users
      })
  }

  select(user) {
    console.log('select: ' + user.id + ' ' + user.lastName + ' ' + user.username)
    //  console.log('user: ' + user)
    this.selectedId = user.id
    this.authgtz.selectedUser = JSON.parse(JSON.stringify(user))//;user
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return true
  }
}
