var _ = require('underscore'),
    underscoreStr = require('underscore.string'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    bower = require('bower'),
    mainBowerFiles = require('main-bower-files');

var filesToMove = {
    './app/conf/*': './dist/conf/',
    './app/img/*': './dist/img/',
  	'./app/cache/*.php': './dist/cache/',
  	'./app/cache/*.json': './dist/',
  	'./app/*.html': './dist/',
  	'./app/js/modules/*/includes/*.html': './dist/js/modules/',
    './app/css/font-awesome/css/*': './dist/css/font-awesome/css/',
    './app/css/font-awesome/fonts/**/*': './dist/css/font-awesome/fonts/',
    './app/includes/*': './dist/includes/',
    './app/index.html': './dist/'
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
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css/'));
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
        .pipe(uglify({
          mangle: false
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('clean', function(){
    return gulp.src(['./dist/*'], {read:false})
    .pipe(clean({force: true}));
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
    gulp.watch(['./app/css/less/*.less'], ['less'])
        .on('change', onChange);
    gulp.watch(['./app/js/modules/**/*.js'] ['js'])
        .on('change', onChange);
});

gulp.task('default', ['less', 'bower', 'js', 'move']);
