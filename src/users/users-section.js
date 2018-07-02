
export class UsersSection {
  configureRouter(config, router) {
    config.map([
      // { name:'u1' , route: '',    moduleId: './user-list', nav: false, title: '' },
      { name:'u1' , route: '',    moduleId: './no-selection', nav: false, title: '' },
    
   //   { name:'users' ,route: 'users/:id', moduleId: './user',      nav: false, title: '' },

   //  { name:'users' ,route: '/:id', moduleId: './user',      nav: false, title: '' }
  { name:'users' ,route: ':id', moduleId: './user-detail',      nav: false, title: '' }


    ]);
  }
}
