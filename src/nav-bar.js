import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {   AuthServiceGTZ } from './services';

@inject(EventAggregator,AuthServiceGTZ)
export class NavBar {
  @bindable router = null;
 _isAuthenticated = false;

 constructor(ea, authgtz) {
  
    this.ea = ea;
      this.authgtz = authgtz;
 
    this.subscription = this.ea.subscribe('router:navigation:complete', () => this.routeChanged());
  }

  attached() {
    this.dialog = kendo.jQuery(this.themeSelector).kendoWindow({
      width: '800px',
      visible: false,
      title: 'Themes',
      actions: [
        'Pin',
        'Minimize',
        'Maximize',
        'Close'
      ]
    }).data('kendoWindow');

    kendo.jQuery(this.themeSelector).parent().addClass('theme-window');

    kendo.jQuery(this.menu).kendoMenu({
      select: (e) => {
        kendo.jQuery(this.menu).find('.k-state-selected').removeClass('k-state-selected');
        kendo.jQuery(e.item).addClass('k-state-selected');
      }
    });
  }
 get isAuthenticated() {
      //  alert('n2')
        // return this.auth.isAuthenticated();
     //   console.log('this.authgtz.loginuserid', this.authgtz.loginuserid)
        return this.authgtz.loginuserid === "" ? false : true;
    }
  routeChanged() {
    kendo.jQuery(this.menu).find('.k-state-selected').removeClass('k-state-selected');

    let route = this.router.currentInstruction;

    // prefix hash to the fragment
    let fragment = `#${route.fragment}`;

    // check if any anchor's href is at the start of the fragment
    kendo.jQuery('a', this.menu).each((i, anchor) => {
      let href = kendo.jQuery(anchor).attr('href');

      if (href !== '#' && fragment.startsWith(href)) {
        kendo.jQuery(anchor).addClass('k-state-selected');
      }
    });
  }

  showThemeDialog() {
    this.dialog.open();
    this.dialog.center();
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }
}
