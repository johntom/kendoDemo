import $ from "jquery";
import { inject } from "aurelia-framework";

import { Router } from "aurelia-router";
// import { api } from '../Utils/api';
import { AuthServiceGTZ } from '../services'
import { ApiService } from '../servicesApi'
import lodash from 'lodash';
@inject(Router, AuthServiceGTZ, ApiService)
export class Profile {

    heading = 'Profile page';
    email = '';
    password = '';
    recSaved = '';


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
    // Hackensack Paramus Bcua Bergen Passaic Sober Clifton
    data = [{
        town: 'All',
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
    }
        , {
        town: 'SB-JIF',
        tid: '8'
    }, {
        town: 'JIF-BERGEN',
        tid: '9'
    }
    ]
    // value = [
    //     { town: 'Paramus',tid:'2'},
    //     { town: 'Passaic' ,tid:'5'}
    //   ]
    constructor(router, authgtz, api) {
        if (authgtz.user === '') {

            this.router.navigate("login")

        }
        this.message = "Profile user!";
        this.router = router
        this.authgtz = authgtz;
        this.user = this.authgtz.user;
        this.api = api
        console.log('this.user ', this.user)
        // this.value = [
        //     { town: 'Paramus', tid: '2' },
        //     { town: 'Passaic', tid: '5' }
        // ]
        //  this.value = [
        //             { town: 'Paramus' },
        //             { town: 'Passaic' }
        //         ]
        //this.value =  this.customer.roles
        // this.value = []
        let arry = []
        lodash.forEach(this.user.roles, function (role) {
            arry.push({ town: role })
        })
        this.value = arry

        let arry2 = []
        lodash.forEach(this.user.templates, function (temp) {
            arry2.push({ template: temp })
        })
        this.valuetemp = arry2

        if (this.authgtz.loginuserid === "") {
            // alert('Please login')
            this.loginuserid = 0;// 11832;// brian s
            this.roleid = 3;

        } else {
            this.loginuserid = this.authgtz.loginuserid
            this.roleid = this.authgtz.user.RoleId
            this.token = this.authgtz.token
        }
        console.log('  this.user = authgtz.user ', this.user, this.authgtz, this.authgtz.user)
    }
    getValues() {
        alert(this.multiselect.value());
    }
    signup() {
        var myUser = { email: this.user.Email, password: this.user.Password, towns: this.multiselect.value() } //required }

        console.log(myUser);
    }





    // attached() {
    //     $(document).ready(function () {

    //         Materialize.updateTextFields();

    //     })
    // }

    // move(customer, mysqlid) {
    //     //http://10.1.110.203:8004/api/users/move/13262?token=eyJhbGciOiJIUzI1NiJ9.NTNmMTY3NjllZTk5YTBmMDFlYWM0N2Q4.cx_Qv913lp4Q7lj-QsQUJ8w4DdDM16SRv3_BzraUPrc
    //     Materialize.toast('profile record ' + customer + ' id ' + mysqlid + 'saved!', 4000)
    //     api.moveUser(this.token, customer, mysqlid)
    //         .then((jsonRes) => {
    //             Materialize.toast('profile record saved!', 4000)
    //         })


    // }
    save(user) {

        //  if (customer.userid !== 0) {

        // Materialize.toast('record saved!', 4000) // 4000 is the duration of the toast

        //api.updateUser(customer,this.token)
        api.updateUser(user)
            .then((jsonRes) => {
            })
        this.recSaved = 'Record saved'
        //}


        // return request.send().then(response => response.content);
    }
    close() {

        let rt2 = 'redirect'
        this.router.navigate(rt2 + '?route=mail');

    }
}

