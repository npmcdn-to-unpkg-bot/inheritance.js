/* jshint esnext: true */
/* globals require */


const gulp        = require('gulp');
const concat      = require('gulp-concat');
const del         = require('del');
const header      = require('gulp-header');
const jscs        = require('gulp-jscs');
const jscsStylish = require('gulp-jscs-stylish');
const jshint      = require('gulp-jshint');
const merge       = require('merge-stream');
const path        = require('path');
const rename      = require('gulp-rename');
const replace     = require('gulp-replace');
const runSequence = require('run-sequence');
const uglify      = require('gulp-uglify');
const util        = require('gulp-util');
const wrapUMD     = require('gulp-wrap-umd');



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

  build: {
    dir:     'build/',
    modules: {}
  },
  dist: {
    dir:     'dist/',
    modules: {}
  },
  docs: { dir: 'docs/' },
  lint: {},
  reports: { dir: 'reports/' },
  src: {
    dir:     'src/',
    selector: {}
  },
  tests: { dir: 'test/' },

  umd: {
    deps:                              [],
    exports:                           {},
    namespace:                         'I',
    globalExportTemplateInitNamespace: 'root.I = {};\n    <%= _default %>'
  }
};


// jscs:disable disallowOperatorBeforeLineBreak

config.fileHeader =
`/*!
 * inheritance.js (${config.pkg.version})
 *
 * Copyright (c) ${(new Date()).getFullYear()} Brandon Sara (http://bsara.github.io)
 * Licensed under the ${config.pkg.license} (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */
`;


config.umd.exports.all =
`{
  mix:              mix,
  mixDeep:          mixDeep,
  mixPrototype:     mixPrototype,
  mixPrototypeDeep: mixPrototypeDeep,
  inheritance:      inheritance,
  makeInheritable:  makeInheritable,
  seal:             seal,
  ObjectDefinition: ObjectDefinition
};`;

config.umd.exports.noExts =
`{
  mix:              mix,
  mixDeep:          mixDeep,
  mixPrototype:     mixPrototype,
  mixPrototypeDeep: mixPrototypeDeep,
  inheritance:      inheritance,
  makeInheritable:  makeInheritable,
  seal:             seal,
  ObjectDefinition: ObjectDefinition
};`;

config.umd.exports.objectDef =
`{
  mix:              mix,
  mixDeep:          mixDeep,
  inheritance:      inheritance,
  makeInheritable:  makeInheritable,
  seal:             seal,
  ObjectDefinition: ObjectDefinition
};`;

config.umd.exports.inheritance =
`{
  mixDeep:     mixDeep,
  inheritance: inheritance
};`;

config.umd.exports.makeInheritable =
`{
  mixDeep:         mixDeep,
  inheritance:     inheritance,
  makeInheritable: makeInheritable
};`;

config.umd.exports.mixPrototype =
`{
  mix:          mix,
  mixPrototype: mixPrototype
};`;

config.umd.exports.mixPrototypeDeep =
`{
  mixDeep:      mixDeep,
  mixPrototype: mixPrototypeDeep
};`;


config.umd.globalExportTemplateObjectDef =
`<%= _default %>
    root.ObjectDefinition = root.<%= namespace %>.ObjectDefinition;
    delete root.<%= namespace %>.ObjectDefinition;
`;

// jscs:enable disallowOperatorBeforeLineBreak


config.build.modules.dir = path.join(config.build.dir, 'modules');
config.dist.modules.dir  = path.join(config.dist.dir, 'modules');

config.src.selector = {
  inherit: {
    inheritance:     path.join(config.src.dir, 'inherit', 'inheritance.js'),
    makeInheritable: path.join(config.src.dir, 'inherit', 'make-inheritable.js'),
    seal:            path.join(config.src.dir, 'inherit', 'seal.js')
  },
  internalUtils: path.join(config.src.dir, 'internal-utils.js'),
  mixin: {
    mix:              path.join(config.src.dir, 'mixin', 'mix.js'),
    mixDeep:          path.join(config.src.dir, 'mixin', 'mix-deep.js'),
    mixPrototype:     path.join(config.src.dir, 'mixin', 'mix-prototype.js'),
    mixPrototypeDeep: path.join(config.src.dir, 'mixin', 'mix-prototype-deep.js')
  },
  objectDef: path.join(config.src.dir, 'object-definition.js'),
  scripts:   path.join(config.src.dir, '**', '*.js'),
  tests:     path.join(config.tests.dir, '**', '*.js')
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
  var task   = util.colors.green;

  console.log(String.EMPTY);
  console.log(header(`inheritance.js Gulp Tasks`));
  console.log(header(`------------------------------------------------------------------------------`));
  console.log(`  ${task("help")} (${util.colors.yellow("default")}) - Displays this message.`);
  console.log(String.EMPTY);
  console.log(`  ${task("build")}          - Builds the project.`);
  console.log(`  ${task("build:modules")}  - Builds the project in separate modules.`);
  console.log(`  ${task("rebuild")}        - Cleans the build folder, then builds the project.`);
  // console.log(`  ${task("docs")}           - Generates documentation based on inline JSDoc comments.`);
  console.log(`  ${task("dist")}           - Performs all needed tasks to prepare the built project`);
  console.log(`                   for a new release.`);
  // console.log(String.EMPTY);
  // console.log(`  ${task("test")}           - Runs the project's tests.`);
  console.log(String.EMPTY);
  console.log(`  ${task("clean")}          - Runs all available cleaning tasks in parallel.`);
  console.log(`  ${task("clean:build")}    - Cleans the build output directory.`);
  // console.log(`  ${task("clean:docs")}     - Cleans the documentation output directory.`);
  console.log(`  ${task("clean:dist")}     - Cleans the distribution output directory.`);
  console.log(`  ${task("clean:reports")}  - Cleans the reports output directory.`);
  console.log(String.EMPTY);
  console.log(`  ${task("lint")}           - Runs all available linting tasks in parallel.`);
  console.log(`  ${task("jshint")}         - Runs JSHint on the project source files.`);
  console.log(`  ${task("jscs")}           - Runs JSCS on the project source files.`);
  console.log(String.EMPTY);
});



// Build Tasks
// ----------------

gulp.task('build', [ 'build:modules' ], function() {
  var all = gulp.src(config.src.selector.scripts)
                .pipe(concat('inheritance.js'))
                .pipe(wrapUMD({
                  deps:                 config.umd.deps,
                  namespace:            config.umd.namespace,
                  globalExportTemplate: config.umd.globalExportTemplateObjectDef,
                  exports:              config.umd.exports.all
                }));

  var noExts = gulp.src([
                     config.src.selector.internalUtils,
                     config.src.selector.mixin.mix,
                     config.src.selector.mixin.mixDeep,
                     config.src.selector.mixin.mixPrototype,
                     config.src.selector.mixin.mixPrototypeDeep,
                     config.src.selector.inherit.inheritance,
                     config.src.selector.inherit.makeInheritable,
                     config.src.selector.inherit.seal,
                     config.src.selector.objectDef
                   ])
                   .pipe(concat('inheritance.noexts.js'))
                   .pipe(wrapUMD({
                     deps:                 config.umd.deps,
                     namespace:            config.umd.namespace,
                     globalExportTemplate: config.umd.globalExportTemplateObjectDef,
                     exports:              config.umd.exports.noExts
                   }));

  return merge(all, noExts)
          .pipe(replace(/\s*\/\/\s*js(hint\s|cs:).*$/gmi, String.EMPTY))
          .pipe(replace(/\s*\/\*\s*(js(hint|lint|cs:)|global(|s)|exported)\s.*?\*\/\s*\n/gmi, String.EMPTY))
          .pipe(header(config.fileHeader))
          .pipe(gulp.dest(config.build.dir));
});


gulp.task('build:modules', function() {
  var objectDef = gulp.src([
                        config.src.selector.internalUtils,
                        config.src.selector.mixin.mix,
                        config.src.selector.mixin.mixDeep,
                        config.src.selector.inherit.inheritance,
                        config.src.selector.inherit.makeInheritable,
                        config.src.selector.inherit.seal,
                        config.src.selector.objectDef
                      ])
                      .pipe(concat('inheritance.objectdef.js'))
                      .pipe(wrapUMD({
                        deps:                 config.umd.deps,
                        namespace:            config.umd.namespace,
                        globalExportTemplate: 'root.I = {};\n    <%= _default %>',
                        exports:              config.umd.exports.objectDef
                      }));

  var inheritance = gulp.src([
                          config.src.selector.internalUtils,
                          config.src.selector.mixin.mixDeep,
                          config.src.selector.inherit.inheritance
                        ])
                        .pipe(concat('inheritance.inheritance.js'))
                        .pipe(wrapUMD({
                          deps:      config.umd.deps,
                          namespace: config.umd.namespace,
                          exports:   config.umd.exports.inheritance
                        }));

  var makeInheritable = gulp.src([
                              config.src.selector.internalUtils,
                              config.src.selector.mixin.mixDeep,
                              config.src.selector.inherit.inheritance,
                              config.src.selector.inherit.makeInheritable
                            ])
                            .pipe(concat('inheritance.makeinheritable.js'))
                            .pipe(wrapUMD({
                              deps:      config.umd.deps,
                              namespace: config.umd.namespace,
                              exports:   config.umd.exports.makeInheritable
                            }));

  var seal = gulp.src(config.src.selector.inherit.seal)
                 .pipe(concat('inheritance.seal.js'))
                 .pipe(wrapUMD({
                   deps:      config.umd.deps,
                   namespace: config.umd.namespace,
                   exports:   'seal'
                 }));

  var mix = gulp.src(config.src.selector.mixin.mix)
                .pipe(concat('inheritance.mix.js'))
                .pipe(wrapUMD({
                  deps:                 config.umd.deps,
                  namespace:            config.umd.namespace + ".mix",
                  globalExportTemplate: config.umd.globalExportTemplateInitNamespace,
                  exports:              'mix'
                }));

  var mixDeep = gulp.src(config.src.selector.mixin.mixDeep)
                    .pipe(concat('inheritance.mixdeep.js'))
                    .pipe(wrapUMD({
                      deps:                 config.umd.deps,
                      namespace:            config.umd.namespace + ".mixDeep",
                      globalExportTemplate: config.umd.globalExportTemplateInitNamespace,
                      exports:              'mixDeep'
                    }));

  var mixPrototype = gulp.src([
                           config.src.selector.mixin.mix,
                           config.src.selector.mixin.mixPrototype
                         ])
                         .pipe(concat('inheritance.mixprototype.js'))
                         .pipe(wrapUMD({
                           deps:      config.umd.deps,
                           namespace: config.umd.namespace,
                           exports:   config.umd.exports.mixPrototype
                         }));

  var mixPrototypeDeep = gulp.src([
                               config.src.selector.mixin.mixDeep,
                               config.src.selector.mixin.mixPrototypeDeep
                             ])
                             .pipe(concat('inheritance.mixprototypedeep.js'))
                             .pipe(wrapUMD({
                               deps:      config.umd.deps,
                               namespace: config.umd.namespace,
                               exports:   config.umd.exports.mixPrototypeDeep
                             }));

  return merge(objectDef, inheritance, makeInheritable, seal, mix, mixDeep, mixPrototype, mixPrototypeDeep)
          .pipe(replace(/\s*\/\/\s*js(hint\s|cs:).*$/gmi, String.EMPTY))
          .pipe(replace(/\s*\/\*\s*(js(hint|lint|cs:)|global(|s)|exported)\s.*?\*\/\s*\n/gmi, String.EMPTY))
          .pipe(header(config.fileHeader))
          .pipe(gulp.dest(config.build.modules.dir));
});


gulp.task('rebuild', function(callback) {
  runSequence('clean:build', 'build', callback);
});


gulp.task('dist', [ 'clean:build', 'clean:dist' ], function(callback) {
  runSequence('lint', 'build', 'test', function(err) {
    if (err) {
      callback(err);
      return;
    }

    var main = gulp.src(path.join(config.build.dir, '*.js'))
                   .pipe(gulp.dest(config.dist.dir))
                   .pipe(uglify({ preserveComments: 'some' }))
                   .pipe(rename({ suffix: '.min' }))
                   .pipe(gulp.dest(config.dist.dir));

    var modules = gulp.src(path.join(config.build.modules.dir, '*.js'))
                      .pipe(gulp.dest(config.dist.modules.dir))
                      .pipe(uglify({ preserveComments: 'some' }))
                      .pipe(rename({ suffix: '.min' }))
                      .pipe(gulp.dest(config.dist.modules.dir));

    merge(main, modules);

    callback();
  });
});


// gulp.task('docs', [ 'clean:docs' ], function() {
//   return gulp.src([ config.src.selector.scripts, 'README.md' ])
//              .pipe(jsdoc.parser(null, `inheritance.js`))
//              .pipe(jsdoc.generator(config.docs.dir));
// });



// Test Tasks
// ----------------

gulp.task('test', function() {
  util.log(util.colors.yellow("Tests are not yet implemented!"));
});



// Clean Tasks
// ----------------

gulp.task('clean', [ 'clean:build', 'clean:dist', 'clean:docs', 'clean:reports' ]);


gulp.task('clean:build', function() {
  return del(config.build.dir);
});


gulp.task('clean:dist', function() {
  return del(config.dist.dir);
});


gulp.task('clean:docs', function() {
  return del(config.docs.dir);
});


gulp.task('clean:reports', function() {
  return del(config.reports.dir);
});



// Lint Tasks
// ----------------

gulp.task('lint', [ 'jshint', 'jscs' ]);


gulp.task('jshint', function() {
  return gulp.src(config.lint.selectors)
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
             .pipe(jshint.reporter('fail', { verbose: true }));
});


gulp.task('jscs', function() {
  return gulp.src(config.lint.selectors)
             .pipe(jscs({ verbose: true }))
             .pipe(jscsStylish());
});
