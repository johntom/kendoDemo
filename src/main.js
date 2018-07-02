import 'bootstrap';
import { Settings } from 'settings';
import { ThemeManager } from 'shared/theme-manager';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // .plugin('aurelia-kendoui-bridge', (kendo) => kendo.detect().notifyBindingBehavior())
    .plugin('aurelia-kendoui-bridge', (kendo) => kendo.pro())
    .plugin('aurelia-after-attached-plugin');

  aurelia.use.globalResources('shared/collapse-panel');
  aurelia.use.globalResources('shared/markdown');
  aurelia.use.globalResources('shared/logger');
  aurelia.use.globalResources('shared/au-code');

  aurelia.start()
    .then(au => {
      let manager = au.container.get(ThemeManager);
      let settings = au.container.get(Settings);
      let settingTheme


      let settingsLocal = localStorage["activeTheme"];
      if (settingsLocal) {
        settingTheme = settingsLocal
      } else {
        settingTheme = settings.defaultTheme
      }

     //alert(settingTheme)
      return manager.loadTheme(settingTheme)
        .then(() => au);
    })
    .then(au => au.setRoot('app'));
}
