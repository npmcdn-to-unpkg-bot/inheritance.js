/* globals require */


var gulp                  = require('gulp');
var concat                = require('gulp-concat');
var del                   = require('del');
var insert                = require('gulp-insert');
var jscs                  = require('gulp-jscs');
var jsdoc                 = require('gulp-jsdoc');
var jshint                = require('gulp-jshint');
var jshintStylishReporter = require('jshint-stylish');
var merge                 = require('merge-stream');
var order                 = require('gulp-order');
var rename                = require('gulp-rename');
var runSequence           = require('run-sequence');
var uglify                = require('gulp-uglify');
var util                  = require('gulp-util');



// ------------------------- //
// Helpers                   //
// ------------------------- //

String.EMPTY = '';
String.SPACE = ' ';




// ------------------------- //
// Configuration             //
// ------------------------- //

var config = {
  pkg: require('./package.json'),

  build: { dir: 'build/' },
  dist: { dir: 'dist/' },
  docs: { dir: 'docs/' },
  lint: {},
  reports: { dir: 'reports/' },
  src: {
    dir: 'src/',
    selector: {}
  },
  tests: { dir: 'test/' }
};

config.fileHeader = "/*!\n * Inheritance.js (" + config.pkg.version + ")\n *\n * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)\n * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)\n */\n\n";

config.src.selector = {
  extendObjDef     : config.src.dir + 'extend-object-def.js',
  extensions       : config.src.dir + 'extensions/*.js',
  mixin            : config.src.dir + 'mixin.js',
  objectDefinition : config.src.dir + 'object-definition.js',
  scripts          : config.src.dir + '**/*.js',
  tests            : config.tests.dir + '**/*.js'
};

config.lint.selectors = [
  'gulpfile.js',
  config.src.selector.scripts,
  config.src.selector.tests
];




// ------------------------- //
// Tasks                     //
// ------------------------- //

gulp.task('default', [ 'help' ]);



gulp.task('help', function() {
  var header = util.colors.bold.blue;
  var task = util.colors.green;

  console.log(String.EMPTY);
  console.log(header("Inheritance.js Gulp Tasks"));
  console.log(header("------------------------------------------------------------------------------"));
  console.log("  " + task("help") + " (" + util.colors.yellow("default") + ") - Displays this message.");
  console.log(String.EMPTY);
  console.log("  " + task("build") + "          - Builds the project.");
  console.log("  " + task("rebuild") + "        - Cleans the build folder, then builds the project.");
  console.log("  " + task("docs") + "           - Generates documentation based on inline JSDoc comments.");
  console.log("  " + task("dist") + "           - Performs all needed tasks to prepare the built project");
  console.log("                   for a new release.");
  // console.log(String.EMPTY);
  // console.log("  " + task("test") + "           - Runs the project's tests.");
  console.log(String.EMPTY);
  console.log("  " + task("clean") + "          - Runs all available cleaning tasks in parallel.");
  console.log("  " + task("clean:build") + "    - Cleans the build output directory.");
  console.log("  " + task("clean:docs") + "     - Cleans the documentation output directory.");
  console.log("  " + task("clean:dist") + "     - Cleans the distribution output directory.");
  console.log("  " + task("clean:reports") + "  - Cleans the reports output directory.");
  console.log(String.EMPTY);
  console.log("  " + task("lint") + "           - Runs all available linting tasks in parallel.");
  console.log("  " + task("jshint") + "         - Runs JSHint on the project source files.");
  console.log("  " + task("jscs") + "           - Runs JSCS on the project source files.");
  console.log(String.EMPTY);
});



// Build Tasks
// ----------------

gulp.task('build', function() {
  var all = gulp.src(config.src.selector.scripts)
                .pipe(order([
                  config.src.selector.mixin,
                  config.src.selector.extendObjDef,
                  config.src.selector.extensions,
                  config.src.selector.objectDefinition
                ]))
                .pipe(concat('inheritance.js'));

  var objDefinition = gulp.src([
                            config.src.selector.mixin,
                            config.src.selector.extendObjDef,
                            config.src.dir + 'extensions/object.js',
                            config.src.selector.objectDefinition
                          ])
                          .pipe(concat('inheritance.object-definition.js'));

  var extendObjDef = gulp.src([
                           config.src.selector.mixin,
                           config.src.selector.extendObjDef
                         ])
                         .pipe(concat('inheritance.extend-object-def.js'));

  var mixin = gulp.src(config.src.selector.mixin)
                  .pipe(rename('inheritance.mixin.js'));

  return merge(all, objDefinition, extendObjDef, mixin)
          .pipe(insert.prepend(config.fileHeader))
          .pipe(gulp.dest(config.build.dir));
});


gulp.task('rebuild', function(callback) {
  runSequence('clean:build', 'build', callback);
});


gulp.task('dist', function(callback) {
  runSequence('lint', 'test', 'rebuild', 'clean:dist', function(err) {
    if (err) {
      callback(err);
      return;
    }

    var scripts = gulp.src(config.build.dir + '*.js');

    var minifiedScripts = gulp.src(config.build.dir + '*.js')
                              .pipe(uglify({ preserveComments: 'some' }))
                              .pipe(rename({ suffix: '.min' }));

    merge(scripts, minifiedScripts)
      .pipe(gulp.dest(config.dist.dir));

    callback();
  });
});


gulp.task('docs', [ 'clean:docs' ], function() {
  return gulp.src([ config.src.selector.scripts, 'README.md' ])
             .pipe(jsdoc.parser(null, 'Inheritance.js'))
             .pipe(jsdoc.generator(config.docs.dir));
});



// Test Tasks
// ----------------

gulp.task('test', function() {
  util.log(util.colors.yellow("Tests are not yet implemented!"));
});



// Clean Tasks
// ----------------

gulp.task('clean', [ 'clean:build', 'clean:dist', 'clean:docs', 'clean:reports' ]);


gulp.task('clean:build', function(callback) {
  del(config.build.dir, callback);
});


gulp.task('clean:dist', function(callback) {
  del(config.dist.dir, callback);
});


gulp.task('clean:docs', function(callback) {
  del(config.docs.dir, callback);
});


gulp.task('clean:reports', function(callback) {
  del(config.reports.dir, callback);
});



// Lint Tasks
// ----------------

gulp.task('lint', [ 'jshint', 'jscs' ]);


gulp.task('jshint', function() {
  return gulp.src(config.lint.selectors)
             .pipe(jshint())
             .pipe(jshint.reporter(jshintStylishReporter))
             .pipe(jshint.reporter('fail'));
});


gulp.task('jscs', function() {
  return gulp.src(config.lint.selectors)
             .pipe(jscs({ verbose: true }));
});
