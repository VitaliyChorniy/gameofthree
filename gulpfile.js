const gulp = require('gulp');
const exec = require('child_process').exec;
const runSequence = require('run-sequence');
const open = require('gulp-open');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('start', (done) => {
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

gulp.task('build-web', () => {
    return gulp.src('web/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('web/dist'));
});

gulp.task('start-web-server', (done) => {
    exec('npm start', {
        maxBuffer: 1024 * 5000
    }, (err, stdout, stderr) => {
        done(err);
    });
})

gulp.task('open-web', () => {
    gulp.src('./web/index.html')
        .pipe(open({
            uri: 'http://localhost:3232'
        }));
});

gulp.task('copy-libs', () => {
    return gulp.src([
            'bootstrap/**',
            'jquery/**'
        ], {
            cwd: 'node_modules/**'
        })
        .pipe(gulp.dest('web/lib'));
});

gulp.task('start-web', (done) => {
    runSequence('copy-libs', 'build-web','start-web-server', 'open-web', () => done());
});

gulp.task('start-api-server', (done) => {
    runSequence('start', () => done());
});
