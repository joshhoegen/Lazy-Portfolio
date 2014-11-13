var _ = require('underscore'),
    underscoreStr = require('underscore.string'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
	rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    bower = require('bower'),
    mainBowerFiles = require('main-bower-files');
    
var filesToMove = {
    './app/conf/*': './app/dist/conf/',
    './app/img/*': './app/dist/img/',
	'./app/js/main.js': './app/dist/js/',
	'./app/css/app.css': './app/dist/css/',
    './app/css/font-awesome/css/*': './app/dist/css/font-awesome/css/',
    './app/css/font-awesome/fonts/**/*': './app/dist/css/font-awesome/fonts/',
    './app/includes/*.html': './app/dist/includes/',
    './app/index.html': './app/dist/'
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
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('js', function(){
	gulp.src('./app/js/main.js')
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
		.pipe(gulp.dest('./app/'))
		.pipe(gulp.dest('./app/dist/js/'));
});

gulp.task('clean', function(){
    return gulp.src(['dist/*'], {read:false})
    .pipe(clean());
});

gulp.task('move', function(){
    _.each(filesToMove, function(v, k){
        gulp.src(k).pipe(gulp.dest(v));
    });
});

gulp.task('watch', function () {
    var onChange = function (evt) {
        console.log('[watcher] File ' + evt.path + ' was ' + evt.type + ', compiling...');
    };
    gulp.watch(['./app/css/less/*.less'], ['clean', 'less', 'move'])
        .on('change', onChange);
    gulp.watch(['./app/js/*.js', './gulpfile.js'] ['clean', 'js', 'move'])
        .on('change', onChange);
	gulp.watch(['./app/*.html', './gulpfile.js'] ['clean', 'move'])
        .on('change', onChange);
});

gulp.task('default', ['clean', 'less', 'bower', 'js', 'move']);
