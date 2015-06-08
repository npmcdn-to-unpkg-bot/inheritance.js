var gulp                  = require('gulp');
var amdOptimizer          = require('gulp-amd-optimizer');
var clean                 = require('gulp-clean');
var concat                = require('gulp-concat');
var jscs                  = require('gulp-jscs');
var jscsHTMLReporter      = require('gulp-jscs-html-reporter');
var jscsStylishReporter   = require('gulp-jscs-stylish');
var jshint                = require('gulp-jshint');
var jshintHTMLReporter    = require('gulp-jscs-html-reporter');
var jshintStylishReporter = require('jshint-stylish');




var config = {
  build: {
    dir: 'build/',
    modules: { dir: 'build/modules' }
  },

  dist: {
    dir: 'dist/',
    modules: { dir: 'dist/modules' }
  },

  reports: {
    dir: 'reports/'
  },

  scripts: {
    dir: 'src/',
    inheritanceJS: {
      path: 'src/inheritance.js'
    },
    selector: {
      all: ['gulpfile.js', 'src/**/*.js', 'test/**/*.js'],
      src: 'src/**/*.js',
      test: 'test/**/*.js'
    }
  }
};




gulp.task('default', ['build']);



gulp.task('help', function() {
  // TODO: Implement
});



gulp.task('build', function() {
  gulp.src('src/inheritance.js', { base: config.scripts.dir })
      .pipe(amdOptimizer({ baseUrl: config.scripts.dir }))
      .pipe(concat('inheritance.js'))
      .pipe(gulp.dest(config.build.dir));
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
  gulp.src(config.build.dir, {read: false})
      .pipe(clean());
});

gulp.task('clean-dist', function() {
  gulp.src(config.dist.dir, {read: false})
      .pipe(clean());
});

gulp.task('clean-reports', function() {
  gulp.src(config.reports.dir, {read: false})
      .pipe(clean());
});



gulp.task('lint', ['jshint', 'jscs']);

gulp.task('jshint', function() {
  gulp.src(config.scripts.selector.all)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylishReporter))
      .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  gulp.src(config.scripts.selector.all)
      .pipe(jscs())
      .pipe(jscs.reporter(jscsStylishReporter));
});



gulp.task('release', ['lint', 'clean', 'dist']);
