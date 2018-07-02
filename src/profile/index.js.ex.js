import $ from "jquery";
import { inject } from "aurelia-framework";

import { Router } from "aurelia-router";
import { api } from '../Utils/api';
import { AuthServiceGTZ } from '../services'
import lodash from 'lodash';
@inject(Router, AuthServiceGTZ)
export class Profile {

    heading = 'Profile page';
    email = '';
    password = '';
    dataT = [{
        template: 'WC-GENERAL',
        tid: '-1'
    }, {
        template: 'WC-BILL',
        tid: '1'
    }, {
        template: 'PARAMUS',
        tid: '2'
    }]
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
    }
        , {
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
    ]
 // Hackensack Paramus Bcua Bergen Passaic Sober Clifton


    // value = [
    //     { town: 'Paramus',tid:'2'},
    //     { town: 'Passaic' ,tid:'5'}
    //   ]
    constructor(router, authgtz) {
        this.message = "Profile user!";

        this.authgtz = authgtz;
        this.customer = this.authgtz.user;
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
        let arry=[]
        lodash.forEach(this.customer.roles, function (role) {
            arry.push({ town: role })

        })
        this.value = arry



        this.selpar = 'selected'
        if (this.authgtz.loginuserid === "") {
            // alert('Please login')
            this.loginuserid = 0;// 11832;// brian s
            this.roleid = 3;

        } else {
            this.loginuserid = this.authgtz.loginuserid
            this.roleid = this.authgtz.user.RoleId
            this.token = this.authgtz.token
        }
        console.log('  this.customer = authgtz.user ', this.customer, this.authgtz, this.authgtz.user)
    }
    getValues() {
        alert(this.multiselect.value());
    }
    signup() {
        //var myUser = { email: this.customer.Email, password: this.customer.Password ,towns:`${this.required}` }
        //alert(`Attendees: ${this.required}`)
        var myUser = { email: this.customer.Email, password: this.customer.Password, towns: this.multiselect.value() } //required }

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
    save(customer) {

        if (customer.userid !== 0) {

            // Materialize.toast('record saved!', 4000) // 4000 is the duration of the toast

            api.updateUser(this.token, customer)
                .then((jsonRes) => {
                })

        }


        return request.send().then(response => response.content);
    }

}

