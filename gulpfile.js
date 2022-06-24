let {src,dest,watch} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel');

function fnIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
function fnLib(){
    return src('./src/lib/**/*')
    .pipe(dest('./dist/lib'));
}
function fnhtml(){
    return src('./src/html/**/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/html'));
}
function fnCSS(){
    return src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
function fnJS(){
    return src('src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
function fnImg(){
    return src('src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
function fnWatch(){
    watch('./src/index.html',fnIndex);
    watch('./src/lib/**/*',fnLib);
    watch('./src/html/**/*.html',fnhtml);
    watch('./src/sass/**/*.scss',fnCSS);
    watch('src/js/**/*.js',fnJS);
    watch('src/img/**/*',fnImg);
}
exports.index = fnIndex;
exports.html = fnhtml;
exports.lib = fnLib;
exports.css = fnCSS;
exports.js = fnJS;
exports.img = fnImg;
exports.default = fnWatch;