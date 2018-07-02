import {
    EventAggregator
} from 'aurelia-event-aggregator';
// import {WebAPI} from './web-api';
import {
    UserUpdated,
    UserViewed
} from './messages';
import { areEqual } from './utility';
import { AuthServiceGTZ } from '../services'
import lodash from 'lodash';
// import {    api} from '../Utils/api';
import { ApiService } from '../servicesApi'

import { AppRouter } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
export class UserDetail {
    static inject = [AppRouter, EventAggregator, AuthServiceGTZ, ApiService];
    heading = 'Profile page';
    email = '';
    password = '';

    dataT = [{
        template: 'WC-GENERAL',
        ttid: '1'
    }, {
        template: 'WC-BILL',
        ttid: '2'
    }, {
        template: 'LIABILITY',
        ttid: '3'
    }, {
        template: 'WC-QF',
        ttid: '4'
    }, {
        template: 'WC-FROI',
        ttid: '5'
    }, {
        template: 'WC-LEGAL',
        ttid: '6'
    }, {
        template: 'WC-LEGALINV',
        ttid: '7'
    }
    ]


    data = [{
        town: '*',
        tid: '-1'
    }, {
        town: 'HACKENSACK',
        tid: '1'
    }, {
        town: 'PARAMUS',
        tid: '2'
    }, {
        town: 'BCUA',
        tid: '3'
    }, {
        town: 'BERGEN',
        tid: '4'
    }, {
        town: 'PASSAIC',
        tid: '5'
    }, {
        town: 'SOBER',
        tid: '6'
    }, {
        town: 'CLIFTON',
        tid: '7'
    }, {
        town: 'SB-JIF',
        tid: '8'
    }, {
        town: 'JIF-BERGEN',
        tid: '9'
    }
    ]
    constructor(router, ea, authgtz, api) {

        // this.api = api;
        this.ea = ea;
        this.router = router
        this.authgtz = authgtz
        this.loginuser = this.authgtz.user
        this.user = this.authgtz.selectedUser
        this.message = "Profile user!";
        let arry = []
        lodash.forEach(this.user.roles, function (role) {
            arry.push({
                town: role
            })
        })
        this.value = arry

        let arry2 = []
        lodash.forEach(this.user.templates, function (temp) {
            arry2.push({
                template: temp
            })
        })
        this.valuetemp = arry2


        this.loginuserid = this.loginuser.loginuserid
        this.roleid = this.loginuser.RoleId
        this.token = this.authgtz.token
        this.api = api


    }
    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior

    }
    getValues() {
        alert(this.multiselect.value());
    }
    signup() {
        //var myUser = { email: this.customer.Email, password: this.customer.Password ,towns:`${this.required}` }
        //alert(`Attendees: ${this.required}`)
        var myUser = {
            email: this.user.Email,
            password: this.user.Password,
            towns: this.multiselect.value()
        } //required }

        console.log(myUser);
    }
    activate(params, routeConfig) {
        this.routeConfig = routeConfig;



        if (this.authgtz.user === '') {

            this.router.navigate("login")

        }

        // this.loginuserid = this.user.loginuserid
        // this.roleid = this.user.RoleId
        // this.token = this.user.token

        // params.id
        // return this.api.getUserDetails(params.id).then(user => {
        // this.user = this.authgtz.selectedUser // user;
        // this.routeConfig.navModel.setTitle(this.user.firstName);
        //this.originalUser = this.user 
        //The beautiful thing about this approach is that it can take an object with infinite levels of nesting, turns it into a string that represents JSON and then we parse the string to get back JSON, thus giving us a new object.

        this.user = JSON.parse(JSON.stringify(this.authgtz.selectedUser))
        this.routeConfig.navModel.setTitle(this.user.firstName);

        this.originalUser = JSON.parse(JSON.stringify(this.user))
        this.ea.publish(new UserViewed(this.user));
        // this.ea.publish(new UserUpdated(this.user));

        let arry = []
        lodash.forEach(this.user.roles, function (role) {
            arry.push({
                town: role
            })
        })
        this.value = arry

        let arry2 = []
        lodash.forEach(this.user.templates, function (temp) {
            arry2.push({
                template: temp
            })
        })
        this.valuetemp = arry2


        return true
        // });
    }

    get canSave() {
        return this.user.firstName && this.user.lastName // && !this.api.isRequesting;
    }

    save(user) {
        //this.api.saveUser(this.user).then(user => {
        // this.loginuser = this.authgtz.user

        // this.user = this.authgtz.selectedUser // user;
        // this.routeConfig.navModel.setTitle(this.user.firstName);
        // this.originalUser = JSON.parse(JSON.stringify(this.user));
        // this.ea.publish(new UserUpdated(this.user));
        //  console.log(user.lastName, user)
        this.user = user
        this.originalUser = user
        this.routeConfig.navModel.setTitle(this.user.firstName);
        this.originalUser = JSON.parse(JSON.stringify(this.user));
        this.ea.publish(new UserUpdated(this.user));


        user.roles = this.multiselect.value()
        user.templates = this.multiselect2.value()

        this.api.updateUser(user, this.token)
            .then((jsonRes) => {
                // let rt = 'users'// users/no-selection' //'users'
                // this.router.navigate(rt + '?refresh=1');
                // let rt = 'users?refresh=1'// users/no-selection' //'users'
                // let rt2 = 'users'
                // this.router.navigate(rt2);



                // history.go(0)
                // return request.send().then(response => response.content); 

                let rt = 'redirect'
                // this.router.navigate(rt);
                this.router.navigate(rt + '?route=users');
                // return request.send().then(response => response.content);
            })

        // <input class="btn btn-warning"  type="button" onClick="history.go(0)" VALUE="Refresh"/>
    }
    canDeactivate() {
        console.log('this.originalUser: ', this.originalUser)
        console.log('this.user: ', this.user)
        // let au = JSON.stringify(this.user)
        let au = JSON.parse(JSON.stringify(this.user))
        console.log('this.user: ', au)
        // if(!areEqual(this.originalUser, au)){
        let origu = {}
        let u = {}
        origu.lastName = this.originalUser.lastName
        origu.firstName = this.originalUser.firstName
        origu.email = this.originalUser.email
        u.lastName = this.user.lastName
        u.firstName = this.user.firstName
        u.email = this.user.email
        //if (!areEqual(this.originalUser.lastName, this.authgtz.selectedUser.lastName)) {
        // if(!areEqual(u, origu)){
        // if (u !== origu){
        if ((u.lastName !== origu.lastName) || (u.firstName !== origu.firstName) || (u.email !== origu.email)) {
            let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

            if (!result) {
                this.ea.publish(new UserViewed(this.user));
            }

            return result;
        }

        return true;
    }
}
