var gulp = require("gulp");
var gutil = require("gulp-util");

var rm = require("gulp-rm");
var webpackStream = require("webpack-stream");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var path = {
    "src": {
        "html": "src/index.html",
        "webpack": "src/**/*.*",
        "css": "src/**/*.css"
    },
    "dist": {
        "dir": "dist/",
        "files": "dist/**/*",  
        "port": 8080 
    }    
};

gulp.task( "clean", function() {
    return gulp.src(path.dist.files, { read: false })
      .pipe(rm());
  })

gulp.task("build", ["build-html"], function() {
  return gulp.src(path.src.webpack)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(path.dist.dir));
});

gulp.task("build-html", function () {
    return gulp.src(path.src.html)
      .pipe(gulp.dest(path.dist.dir));
  });

// see https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
gulp.task("webpack-dev-server", ["build"], function(callback) {
	// modify some webpack config options
	var devServerConfig = Object.create(webpackConfig);
	devServerConfig.devtool = "eval";

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(devServerConfig), {
        contentBase: path.dist.dir,
		stats: {
			colors: true
		}
	}).listen(path.dist.port, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server] Starting", 
            gutil.colors.blue.bold.underline("http://localhost:" + path.dist.port));
	});
});

gulp.task("default", ["build", "webpack-dev-server"]);