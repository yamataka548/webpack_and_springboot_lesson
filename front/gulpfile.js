const gulp = require("gulp");
const $ = require('gulp-load-plugins')();
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

const dirInfo = {
    src: 'src',
    build: 'build',
    dist: 'dist'
};

gulp.task('clean:dist', function (cb) {
    rimraf(dirInfo.dist, cb);
});

gulp.task('clean:build', function (cb) {
    rimraf(dirInfo.build, cb);
});

gulp.task('build:compass', function () {
    return gulp.src(dirInfo.src + '/styles/*.scss')
        .pipe($.compass({
            css: dirInfo.build + '/static/css',
            sass: dirInfo.src + '/styles'
        }));
});

gulp.task('build:html', function () {
    return gulp.src(dirInfo.src + '/**/*.html')
        .pipe(gulp.dest(dirInfo.build + '/templates/'));
});

gulp.task('build:images', function () {
    return gulp.src(dirInfo.src + '/images/**/*')
        .pipe(gulp.dest(dirInfo.build + '/static/images'));
});

gulp.task("build:webpack", () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(dirInfo.build + '/static/scripts'));
});

gulp.task('build:all', function (cb) {
    runSequence(
        'build:webpack',
        ['build:compass', 'build:html'],
        'build:images',
        cb
    );
});

gulp.task('dist:static', function () {
    return gulp.src(dirInfo.build + '/static/**/*.*')
        .pipe(gulp.dest(dirInfo.dist + '/'));
});

gulp.task('dist:templates', function () {
    return gulp.src(dirInfo.build + '/templates/**/*.html')
        .pipe(gulp.dest(dirInfo.dist + '/'));
});

gulp.task('dist:all', function (cb) {
    runSequence(
        ['dist:static', 'dist:templates'],
        cb
    );
});

gulp.task('browserSync', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: dirInfo.dist
        }
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch:app:dev', function () {
    gulp.watch('bower.json', ['prepare:dev']);
    gulp.watch(dirInfo.app + '/**/*.*', ['prepare:dev']);
});

gulp.task('watch:dist', function () {
    gulp.watch(dirInfo.dist + '/**/*.*', ['reload']);
});

gulp.task('build', function (cb) {
    runSequence(
        'clean:build',
        'build:all',
        cb
    );
});

gulp.task('dist', function (cb) {
    runSequence(
        'clean:dist',
        'dist:all',
        cb
    );
});

gulp.task('default', function (cb) {
    runSequence(
        'build',
        'dist',
        'browserSync',
        ['watch:app:dev', 'watch:dist'],
        cb
    );
});
