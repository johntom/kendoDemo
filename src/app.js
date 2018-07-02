export class App {
  configureRouter(config, router) {
    config.title = 'BRM MailFlow'

    config.map([
//  { route: [ '', 'contract-view' ], name: 'contract-view-empty', moduleId: 'contract-view-empty', Title: 'Select a Contract' } 
//  { route: 'contract-view/:id', name: 'contract-view', moduleId: 'contract-view', nav: true, title: 'Test' } 
//  { name: 'home', route: [ '', 'home' ],  moduleId: 'home', Title: 'home' } 

//  { name: 'home', route: '', redirect: 'login/login' },
//  { name: 'mail', route: ['mail'], moduleId: 'mail/index',nav: true, title: 'mail' },
    
//       { name: 'liability', route: 'liability', moduleId: 'liability/index',nav: true ,title: 'LiabilityAnalaysis' },
//          //  { name: 'mailkt', route: ['mailkt'], moduleId: 'mailkt/index', nav: true, title: 'mail kendo template' },
     { name: 'home', route: '', redirect: 'samples' },
    //  { name: 'kendoexcel', route: ['kendoexcel'], moduleId: 'kendoexcel/index', nav: true, title: ' kendo excel mail template' },
  
      // { name: 'scanprocess', route: 'scanprocess', moduleId: 'scanprocess/index', title: 'Process Scans' },
      { name: 'contactsA', route: ['user'], moduleId: 'user/no-selection', title: 'Select' },
      { name: 'contactsB', route: 'contacts/:id', moduleId: 'user/contact-detail' },
      { name: 'profile', route: ['profile'], moduleId: 'profile/index', nav: true, title: 'User Profile', auth: true },

      { name: 'users', route: ['users'], moduleId: 'users/users-section', nav: true, title: 'Users' },
      { name: 'redirect', route: ['redirect'], moduleId: 'redirect/index', nav: false, title: 'Redirect' },

      { name: 'help', route: 'help', moduleId: 'help/index', title: 'Help' },
      //  { name: 'login', route: 'login', moduleId: 'login/login', title: 'login/logout' },
      // { name: 'logout', route: 'login', moduleId: 'login/login', title: 'logout' },
      { name: 'installation', route: 'installation', moduleId: 'installation/installation', title: 'Installation' },
      { name: 'samples', route: 'samples', moduleId: 'samples/index', nav: true, title: 'Samples' },
      { name: 'gist-list', route: 'gist-list', moduleId: 'shared/gist-list', title: 'Gist list' },

    ])

    this.router = router
  }
}
