
import { inject, singleton } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client'


@inject(HttpClient)
export class ApiService {

    constructor(http) {
        this.http = http;
        this.upmess = ''
    //    //this.baseweb = 'http://localhost:8080/api/';
    //     this.baseweb = 'http://jif.bergenrisk.com:8080/api/';
    }


    // getUserJwt(username, pass) {
    //     var token = {};
    //     token.username = username;
    //     token.password = pass;
    //     var url = this.baseweb + 'v1/auth/local';
    //     console.log('url ', url)
    //     return this.http.fetch(url, {
    //         method: 'post',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(token)
    //     }).then((res) => res.json());

    // }

    // findusers() {
    //     var url = this.baseweb + 'v1/findusers';
    //     return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

    // }
    // getUsers() {
    //     var url = baseCms + 'api/users';
    //     return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

    // }

    // findcaseall() {
    //     var url = this.baseweb + 'v1/case/findall'
    //     return this.http.fetch(url).then((res) => res.json())
    // }
    // findcase(roles, auth) {
    //     let url = this.baseweb + `v1/case/find/${auth.user.id}`
    //     return this.http.fetch(url).then((res) => res.json())
    // }

    // findcontents(content, completed) {
    //     console.log(' content  ', content, completed)
    //     let url = this.baseweb + `v1/case/findcontents/${content}/${completed}`
    //     return this.http.fetch(url).then((res) => res.json())
    // }


    // updatecase(row,user) { 
    //     let newrow = {}
    //     newrow._id = row._id
    //     newrow.assignto = row.assignto
    //     newrow.billedamt = row.billedamt
    //     newrow.completed = row.completed
    //     newrow.payamt = row.payamt
    //     newrow.savedamt = row.savedamt
    //     newrow.template = row.template
    //     newrow.type = row.type
    //     newrow.memo = row.memo
    //     newrow.filename = row.filename
    //     newrow.createdAt = row.createdAt
    //     newrow.assignfrom = user.userid // matched staffid unless we use init
    //     let url = this.baseweb + `v1/case/update`
    //     return this.http.fetch(url, {
    //         method: 'put',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //             // , 'Authorization': 'JWT ' + token
    //         },
    //         body: JSON.stringify(newrow)
    //     }).then((res) => res.json());

    // }
    // deletecase(row, token) {
    //     console.log('this.e ', row.id)
    //     let pid = row.id
    //     let url = this.baseweb + `v1/case/deletecase`///${pid}`
    //     // return this.http.fetch(url).then((res) => res.json())
    //     return this.http.fetch(url, {
    //         method: 'delete',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //             , 'Authorization': 'JWT ' + token
    //         },
    //         body: JSON.stringify(row)
    //     }).then((res) => res.json());

    // }
    // updateUser2(user, token) { //token, customer) {

    //     let url = this.baseweb + `v1/staff/update`
    //     let umodel = {
    //         id: user.id,
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         roles: user.roles,
    //         templates: user.templates
    //     }
    //     console.log('user', umodel)
    //     return this.http.fetch(url, {
    //         method: 'put',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //             // , 'Authorization': 'JWT ' + token
    //         },
    //         body: JSON.stringify(umodel)
    //     }).then((res) => res.json())

    // }


    // updateUser(user) {
    //     let umodel = {
    //         id: user.id,
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         roles: user.roles,
    //         templates: user.templates,
    //         password: user.password
    //     }
    //     console.log('user ', umodel)
    //  //   let url = this.baseweb + `v1/staff/updateuser`
    //       let url = this.baseweb + `v1/case/updateuser`
    //     return this.http.fetch(url, {
    //         method: 'put',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //             // , 'Authorization': 'JWT ' + token
    //         },
    //         body: JSON.stringify(user)
    //     }).then((res) => res.json());

    // }



    // walkdir() {
    //     let url = this.baseweb + 'v1/walkdir/getFiles'
    //     console.log('walkdir', url)
    //     return this.http.fetch(url).then((res) => res.json())
    // }

    // walkdirQF() {
    //     let url = baseweb + 'v1/walkdir/getFilesQF'
    //     return this.http.fetch(url).then((res) => res.json())
    // }


    // getLiability(s1, s2, s3) {
    //     //  var url = `http://localhost:8080/api/v1/wc/test/${s1}/${s2}/${s3}`;
    //     var url = this.baseweb + `v1/wc/test/${s1}/${s2}/${s3}`;
    //     return this.http.fetch(url).then((res) => res.json())
    // }


}
