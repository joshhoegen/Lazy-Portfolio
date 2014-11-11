var underscore = require('underscore'),
    underscoreStr = require('underscore.string'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    bower = require('bower'),
    mainBowerFiles = require('main-bower-files');

var paths = {
        sass: {
            watch: ['./goldwater/static/css/scss/*.scss'],
            compile: [
                './goldwater/static/css/scss/*.scss',
                '!./goldwater/static/css/scss/_*.scss'
            ],
            dest: './goldwater/static/css'
        },
        js: {
            watch: ['./goldwater/static/js/*.js'],
            compile: [
                './goldwater/static/js/*.js',
                '!./goldwater/static/js/script.js',
                '!./goldwater/static/js/config.js'
            ],
            dest: './goldwater/static/js',
            file: 'script.js'
        }
    };

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('sass', function() {
    gulp.src(paths.sass.compile)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('js', function(){
	gulp.src(paths.js.compile)
        .pipe(uglify())
        .pipe(browserify({
            shim: {
                jquery: {
                    path: './goldwater/static/js/lib/jquery/dist/jquery.js',
                    exports: '$'
                },
                Bootstrap: {
                    path: './goldwater/static/js/lib/bootstrap/dist/js/bootstrap.js',
                    exports: 'Bootstrap',
                    depends: {
                        jquery: '$',
                    }
                }
            }
        }))
        .pipe(concat(paths.js.file))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('js-libs', ['bower'], function(){
    gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: './goldwater/static/js/components',
            bowerrc: './.bowerrc',
            bowerJson: './bower.json'
        }
    }), { base: './goldwater/static/js/components' }).pipe(gulp.dest('./goldwater/static/js/lib'));
});

gulp.task('watch', function () {
    var onChange = function (evt) {
        console.log('[watcher] File ' + evt.path + ' was ' + evt.type + ', compiling...');
    };
    gulp.watch(paths.sass.watch, ['sass'])
        .on('change', onChange);
    gulp.watch(paths.js.watch, ['js'])
        .on('change', onChange);
});

gulp.task('default', ['sass','js','watch']);
