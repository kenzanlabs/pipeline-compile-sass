'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var compilePipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node');
var validatePipeline = require('pipeline-validate-js');

var config = {
  jsFiles: [
    '*.js',
    'src/*.js',
    'test/*.js'
  ],

  sassFiles: [
    'test/fixtures/*.scss'
  ],
  test: {
    jsFiles: [
      './*.js',
      'src/**/*.js',
      'test/*.js'
    ]
  }
};

gulp.task('compile:sass', function() {
  return gulp
    .src(config.sassFiles)
    .pipe(compilePipeline.compileSASS());
});

gulp.task('build', ['compile:sass'], function() {
  return gulp
    .src(config.test.jsFiles)
    .pipe(plumber())
    .pipe(validatePipeline.validateJS())
    .pipe(testPipeline.test());
});