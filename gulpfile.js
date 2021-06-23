const gulp = require('gulp'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync');

gulp.task('sass', function(){
    return gulp.src("./src/assets/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('fileinclude', function() {
    return gulp.src('./src/pages/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task("watch", function(done) {
    browserSync.init({
        server:'.'
    })

    gulp.watch("./src/assets/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("./src/pages/*.html").on('change', gulp.series('fileinclude'));
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('watch'));