'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var react = require('gulp-react');
var webpack = require('webpack-stream');
var rename = require('gulp-rename');

var base_url = 'src/';
var sass_url = base_url + 'static/scss/**/*.{scss,sass}';
var css_url = base_url + 'static/css';
var jsx_url = base_url + 'static/app';

gulp.task('sass', function () {
    gulp.src(sass_url)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(css_url));
});

gulp.task('copy', function() {
    var dist_url = 'dist/';

    gulp.src(base_url +'**/**/*.{ttf,woff,eot,svg}').pipe(gulp.dest(dist_url));
    gulp.src(base_url +'**/**/*.html').pipe(gulp.dest(dist_url));
    gulp.src(base_url +'**/**/*.{gif,jpg,png}').pipe(gulp.dest(dist_url));
    gulp.src([base_url +'**/**/*.js', '!src/**/**/custom-*.js']).pipe(gulp.dest(dist_url));
    gulp.src(base_url +'**/**/*.css').pipe(gulp.dest(dist_url));

});

gulp.task('webpack', function() {
    return gulp.src('src/static/app/App.js')
        .pipe(webpack({
            module: {
                loaders: [{
                    test: /.js?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                }]
            },
            output: {
                filename: 'App.js'
            }
        }))
        .pipe(gulp.dest(base_url+'static/js'));
});

gulp.task('watch', function() {
    gulp.watch(sass_url, ['sass']);
    gulp.watch(jsx_url+'/**/*',['webpack']);
    gulp.watch('./src/**/*',['copy']);
});

gulp.task('build', ['sass', 'webpack', 'copy']);

gulp.task('default', ['sass', 'webpack', 'watch']);
