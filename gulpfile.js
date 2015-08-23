/*
  Copyright (C) 2013  Bryan Hughes <bryan@theoreticalideations.com>

  This file is part of Aquarium Control.

  Aquarium Control is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Aquarium Control is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Aquarium Control.  If not, see <http://www.gnu.org/licenses/>.
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var del = require('del');
var spawn = require('child_process').spawn;

gulp.task('default', ['clean', 'lint', 'js', 'html', 'libs']);

gulp.task('html', ['clean', 'lint'], function() {
  return gulp.src('client/index.html')
    .pipe(gulp.dest('client-dist/'));
});

gulp.task('js', ['clean', 'lint'], function() {
  return gulp.src('client/src/**/*')
    .pipe(watch('client/src/**/*'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(babel({
        modules: 'amd'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client-dist/src'));
});

gulp.task('libs', ['clean', 'lint'], function() {
  return gulp.src('client/lib/**/*')
    .pipe(gulp.dest('client-dist/lib'));
});

gulp.task('clean', function(cb) {
  del(['client-dist'], cb);
});

gulp.task('lint', function(cb) {
  var lint = spawn('eslint', [ 'client/src' ], {
    stdio: 'inherit'
  });
  lint.on('close', cb);
});
