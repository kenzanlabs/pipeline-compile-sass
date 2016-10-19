'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var handyman = require('pipeline-handyman');
var gulpIf = require('gulp-if');
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');

var config = {
  autoprefix: true,
  concatCSS: true,
  outputFileName: handyman.getPackageName() + '.css',
  outputDirectory: './dest/',
  addSourceMaps: true,
  plugins: {
    autoprefix: {browsers: ['last 2 versions']}
  }
};

module.exports = {
  compileSASS: function(options) {
    if (options) {
      config = handyman.mergeConf(config, options);
    }
    return pipelineFactory();
  }
};

function pipelineFactory() {
  var pipeline;

  pipeline = lazypipe()
    .pipe(function() {
      return gulpIf(config.addSourceMaps, sourcemaps.init());
    })
    .pipe(function() {
      return sass().on('error', sass.logError);
    })
    .pipe(function() {
      return gulpIf(config.autoprefix, postcss([autoprefixer(config.plugins.autoprefix)]));
    })
    .pipe(function() {
      return gulpIf(config.concatCSS, concat(config.outputFileName));
    })
    .pipe(function() {
      return gulpIf(config.addSourceMaps, sourcemaps.write('.'));
    })
    .pipe(function() {
      return gulpIf(config.concatCSS, gulp.dest(config.outputDirectory), gulp.dest(function(file) {
        return file.base;
      }));
    });

  return pipeline();
}