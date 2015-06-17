var gulp                  = require('gulp');
var clean                 = require('gulp-clean');
var concat                = require('gulp-concat');
var insert                = require('gulp-insert');
var jscs                  = require('gulp-jscs');
var jshint                = require('gulp-jshint');
var jshintStylishReporter = require('jshint-stylish');
var rename                = require('gulp-rename');
var uglify                = require('gulp-uglify');




// ------------------------- //
// Configuration             //
// ------------------------- //

var config = {};

config.build = { dir: 'build/' };

config.dist = { dir: 'dist/' };
config.dist.src = { dir: config.dist.dir + 'src/' };

config.pkg = require('./package.json');

config.reports = { dir: 'reports/' };

config.scripts = {};
config.scripts.header = "/*!\n * Inheritance.js (" + config.pkg.version + ")\n *\n * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)\n * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)\n */\n\n"
config.scripts.src = { dir: 'src/' };
config.scripts.tests = { dir: 'test/' };
config.scripts.selector = {
  src: config.scripts.src.dir + '**/*.js',
  tests: config.scripts.tests.dir + '**/*.js'
};
config.scripts.selector.all = ['gulpfile.js', config.scripts.selector.src, config.scripts.selector.tests];




// ------------------------- //
// Tasks                     //
// ------------------------- //

gulp.task('default', ['build']);



gulp.task('help', function() {
  // TODO: Implement
});



// Build Tasks
// ----------------

gulp.task('build', ['build-all-in-one', 'build-partials']);


gulp.task('build-all-in-one', function() {
  gulp.src(['src/mixin.js', 'src/extend-object-def.js', 'src/extensions/*.js', 'src/object-definition.js'])
      .pipe(concat('inheritance.js'))
      .pipe(insert.prepend(config.scripts.header))
      .pipe(gulp.dest(config.build.dir));
});


gulp.task('build-partials', ['build-partial-object-definition', 'build-partial-extend-object-def', 'build-partial-mixin']);

gulp.task('build-partial-object-definition', function() {
  gulp.src(['src/mixin.js', 'src/extend-object-def.js', 'src/extensions/object.js', 'src/object-definition.js'])
      .pipe(concat('inheritance.object-definition.js'))
      .pipe(insert.prepend(config.scripts.header))
      .pipe(gulp.dest(config.build.dir));
});

gulp.task('build-partial-extend-object-def', function() {
  gulp.src(['src/mixin.js', 'src/extend-object-def.js'])
      .pipe(concat('inheritance.extend-object-def.js'))
      .pipe(insert.prepend(config.scripts.header))
      .pipe(gulp.dest(config.build.dir));
});

gulp.task('build-partial-mixin', function() {
  gulp.src('src/mixin.js', { base: config.scripts.src.dir })
      .pipe(insert.prepend(config.scripts.header))
      .pipe(rename('inheritance.mixin.js'))
      .pipe(gulp.dest(config.build.dir));
});


gulp.task('rebuild', ['clean-build', 'build']);



// Dist Tasks
// ----------------

gulp.task('dist', ['dist-src', 'dist-min']);

gulp.task('dist-src', function() {
  gulp.src(config.build.dir + '*.js')
      .pipe(gulp.dest(config.dist.dir));
});

gulp.task('dist-min', function() {
  gulp.src(config.build.dir + '*.js')
      .pipe(uglify({
        preserveComments: 'some'
      }))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(config.dist.dir));
});

gulp.task('redist', ['clean-dist', 'dist']);



// Clean Tasks
// ----------------

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



// Lint Tasks
// ----------------

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('jshint', function() {
  gulp.src(config.scripts.selector.all)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylishReporter))
      .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  gulp.src(config.scripts.selector.all)
      .pipe(jscs({
        verbose: true
      }));
});


// Release Tasks
// ----------------

gulp.task('release', ['lint', 'clean', 'dist']);
