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
    dist: 'dist'
};

gulp.task('clean:dist', function (cb) {
    rimraf(dirInfo.dist, cb);
});

gulp.task('compass', function () {
    return gulp.src(dirInfo.src + '/styles/*.scss')
        .pipe($.compass({
            css: dirInfo.dist + '/css',
            sass: dirInfo.src + '/styles'
        }));
});

gulp.task('html', function () {
    return gulp.src(dirInfo.src + '/**/*.html')
        .pipe(gulp.dest(dirInfo.dist + '/'));
});

gulp.task('images', function () {
    return gulp.src(dirInfo.app + '/images/**/*')
        .pipe(gulp.dest(dirInfo.dist + '/static/images'));
});

gulp.task("webpack", () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(dirInfo.dist + '/scripts'));
});

gulp.task('prepare:dev', function (cb) {
    runSequence(
        'webpack',
        ['compass', 'html'],
        'images',
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
        ['clean:dist'],
        'prepare:dev',
        cb
    );
});

gulp.task('default', function (cb) {
    runSequence(
        ['build'],
        'browserSync',
        ['watch:app:dev', 'watch:dist'],
        cb
    );
});
