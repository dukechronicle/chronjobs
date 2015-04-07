var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['build'], function() {
});

gulp.task('sass', function() {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass({
      includePaths: ['./app/vendor/', './app/styles/']
    }))
    .pipe(minifyCss({}))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
  var b = browserify({
    entries: './app/js/index.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['./app/**/*.html', './app/styles/**/*.scss', './app/**/*.js'], ['build']);
});

gulp.task('images', function() {
  gulp.src('./app/images/**/*')
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('build', ['scripts', 'sass', 'images'], function() {
  gulp.src('./app/**/*.html')
    .pipe(minifyHtml({}))
    .pipe(gulp.dest('./dist/'))
});
