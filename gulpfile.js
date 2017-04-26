const gulp = require('gulp');
const exec = require('child_process').exec;
const runSequence = require('run-sequence');
const open = require('gulp-open');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver')

gulp.task('serve', (done) => {
    const nodemon = exec('nodemon');

    nodemon.stdout.on('data', data => {
        console.log('stdout: ' + data.toString());

        // wait for nodemon to be ready to receive connections
        if (data.toString().indexOf('Connected') >= 0) {
            done();
        }
    });
    nodemon.stderr.on('data', (data) => console.log('stderr: ' + data.toString()));
    nodemon.on('exit', (code) => console.log('start with code ' + code.toString()));
});

gulp.task('build-html', function(){
    return gulp.src(['web/src/**/*.html'])
            .pipe(gulp.dest('web/dist'));
});

gulp.task('build-web', () => {
    return gulp.src('web/src/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('web/dist/app'));
});

gulp.task('start-web-server', (done) => {
  gulp.src('web/dist')
      .pipe(webserver({port: 3232, open: true}));
});

gulp.task('copy-libs', () => {
    return gulp.src([
            'systemjs/dist/system.js',
            'babel-polyfill/dist/polyfill.js',
            'bootstrap/**',
            'jquery/**'
        ], {
            cwd: 'node_modules/**'
        })
        .pipe(gulp.dest('web/dist/lib'));
});

gulp.task('start', (done) => {
    runSequence(
      'copy-libs',
      'build-html',
      'build-web',
      'start-web-server',
      () => done());
});
