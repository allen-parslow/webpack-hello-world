var gulp = require('gulp');

var concatCss = require('gulp-concat-css');
var webpack = require('webpack-stream');

gulp.task('build-js', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-html', function () {
    return gulp.src('src/index.html')
      .pipe(gulp.dest('dist/'));
  });

gulp.task('build-css', function () {
    return gulp.src('src/**/*.css')
      .pipe(concatCss("app.css"))
      .pipe(gulp.dest('dist/'));
  });

gulp.task('default', ['build-js', 'build-css', 'build-html']);