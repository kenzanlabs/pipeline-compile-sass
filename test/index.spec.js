'use strict';

var compilePipeline = require('../src/index.js');
var clean = require('gulp-clean');
var gulp = require('gulp');
var path = require('path');
var expectFile = require('gulp-expect-file');

var altOutputPath = 'tmp';

function getFixtures (glob) {
  return path.join(__dirname, 'fixtures', glob);
}

beforeEach(function() {
  clean({force: true});
});

describe('pipeline-compile-sass', function() {

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        autoprefix: false,
        addSourceMaps: false
      }))
      .pipe(expectFile(['dest/pipeline-compile-sass.css']));
    done();
  });

  it('Should output the concatenated file and the map', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        addSourceMaps: true
      }))
      .pipe(expectFile(['dest/pipeline-compile-sass.css', 'dest/pipeline-compile-sass.css.map']));
    done();
  });

});

describe('default options', function() {

  it('Should output two files to default directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS())
      .pipe(expectFile(['dest/pipeline-compile-sass.css', 'dest/pipeline-compile-sass.css.map']));
    done();
  });

});

describe('autoprefixer default options', function() {

  it('Should call the gulp-sass function', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        autoprefix: true
      }));
    done();
  });

});

describe('output to a specified directory', function() {

  it('Should two files directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        outputDirectory: altOutputPath,
        output: altOutputPath
      }))
      .pipe(expectFile(['tmp/pipeline-compile-sass.css.map', 'tmp/pipeline-compile-sass.css']));
    done();
  });

});

describe('output to another filename', function() {

  it('Should two files directory with specified filename', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        outputFileName: 'test-filename.css',
        outputDirectory: altOutputPath,
        output: altOutputPath
      }))
      .pipe(expectFile(['tmp/test-filename.css.map', 'tmp/test-filename.css']));
    done();
  });

});

describe('concatenation set to false', function() {

  afterEach(function() {
    clean({force: true});
  });

  it('Should output two files to default directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileSASS({
        autoprefix: false,
        addSourceMaps: false,
        concatCSS: false
      }))
      .pipe(expectFile(['test/fixtures/test-scss1.css', 'test/fixtures/test-scss2.css']));
    done();
  });

});