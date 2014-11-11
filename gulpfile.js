var underscore = require('underscore'),
    underscoreStr = require('underscore.string'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    bower = require('bower'),
    mainBowerFiles = require('main-bower-files');

var paths = {
        less: {
            watch: ['./app/css/less/*.less'],
            compile: [
                './app/css/less/main.less'
                //'!./goldwater/static/css/scss/_*.scss'
            ],
            dest: './app/css/app.css'
        },
        js: {
            watch: ['./app/js/*.js'],
            compile: [
                './goldwater/static/js/main.js'
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

gulp.task('less', function() {
    gulp.src(['./app/css/less/app.less'])
        .pipe(less({errLogToConsole: true}))
        .pipe(gulp.dest('./app/dist/css/'));
});

gulp.task('js', function(){
	gulp.src('./app/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true,
            shim: {
                jquery: {
                    path: './app/lib/jquery/dist/jquery.js',
                    exports: '$'
                },
                angular: {
                    path: './app/lib/angular/angular.js',
                    exports: 'angular'
                }
            }
        }))
        .pipe(gulp.dest('./app/dist/js/'));
        console.log(gulp.dest('./app/js/main.js'));
});

gulp.task('watch', function () {
    var onChange = function (evt) {
        console.log('[watcher] File ' + evt.path + ' was ' + evt.type + ', compiling...');
    };
    gulp.watch(['./app/css/less/*.less'], ['less'])
        .on('change', onChange);
    gulp.watch(['./app/js/*.js', './gulpfile.js'] ['js'])
        .on('change', onChange);
        
});

gulp.task('default', ['less','js','watch']);
