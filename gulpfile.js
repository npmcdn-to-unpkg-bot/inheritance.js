var gulp                  = require('gulp');
var jscs                  = require('gulp-jscs');
var jscsHTMLReporter      = require('gulp-jscs-html-reporter');
var jscsStylishReporter   = require('gulp-jscs-stylish');
var jshint                = require('gulp-jshint');
var jshintHTMLReporter    = require('gulp-jscs-html-reporter');
var jshintStylishReporter = require('jshint-stylish');




gulp.task('default', ['build']);



gulp.task('help', function() {
  // TODO: Implement
});



gulp.task('build', function() {
  // TODO: Implement
});

gulp.task('rebuild', ['clean-build', 'build']);



gulp.task('dist', ['rebuild', 'dist-all', 'dist-modules']);

gulp.task('dist-all', function() {
  // TODO: Implement
});

gulp.task('dist-modules', ['dist-module-object-ext', 'dist-module-string-ext']);

gulp.task('dist-module-object-ext', function() {
  // TODO: Implement
});

gulp.task('dist-module-string-ext', function() {
  // TODO: Implement
});

gulp.task('redist', ['clean-dist', 'dist']);



gulp.task('clean', ['clean-build', 'clean-dist', 'clean-reports']);

gulp.task('clean-build', function() {
  // TODO: Implement
});

gulp.task('clean-dist', function() {
  // TODO: Implement
});

gulp.task('clean-reports', function() {
  // TODO: Implement
});



gulp.task('lint', function() {
  return gulp.src(['app/**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter(jshintStylish))
             .pipe(jshint.reporter('fail'));
});



gulp.task('release', ['lint', 'clean', 'dist'], function() {
  // TODO: Implement
});
