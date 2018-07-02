var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9001,
    //  ghostMode: false,
    server: {
      baseDir: ['.'],
     
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
gulp.task('serve-bundle', ['bundle'], function (done) {
  
   
  
    var express = require('express');
    var app = express();
    app.use(express.static('./'));
    //var host= '10.1.110.204';
    //var port= 80;
	  var host= '127.0.0.1';
//    var host= '10.1.115.215';
    
    var port= 9000;
    var server = app.listen(port, host, function () {
        //   var host = server.address().address;
        //   var port = server.address().port;
        console.log('Example express4 app listening at http://%s:%s', host, port);
    });


});
