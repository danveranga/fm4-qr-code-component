const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const sassyTask = () => {
    return src('assets/styles/scss/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('assets/styles/css', { sourcemaps: '.' }));
};

// paki convert into arrowfunctions yung mga regular functions

const autoprefixerTassk = () => {
    return src('assets/styles/css/main.css')
    .pipe(postcss([autoprefixer({cascade: false})]))
    .pipe(dest('dist'));
};

const watcherss = () => {
    watch('assets/styles/scss/*.scss', sassyTask);
    watch('assets/styles/css/*.css', autoprefixerTassk);
};

exports.default = series(
    sassyTask,
    autoprefixerTassk,
    watcherss
);