(function () {
    'use strict';

    // Initialize variables
    var gulp = require('gulp');
    var del = require('del');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    var cleanCSS = require('gulp-clean-css');

    // Initialize Panda Ui Libraries
    var version = '2.0.0';
    var panda = [
        // Panda Ui
        'src/Panda/Ui.js',

        // DOM / HTML packages
        'src/Panda/Ui/DOM.js',
        'src/Panda/Ui/HTML.js',
        'src/Panda/Ui/HTML/Weblink.js',
        'src/Panda/Ui/HTML/HTMLFrame.js',

        // Form package
        'src/Panda/Ui/Forms.js',

        // Form Control package
        'src/Panda/Ui/Forms/Controls.js',
        'src/Panda/Ui/Forms/Controls/FromElement.js',
        'src/Panda/Ui/Forms/Controls/FormButton.js',
        'src/Panda/Ui/Forms/Controls/FormInput.js',
        'src/Panda/Ui/Forms/Controls/FormLabel.js',

        // Main files
        'src/Panda/Init.js'
    ];

    // Set default gulp task
    gulp.task('default', ['build']);

    // ==================== BUILD TASKS ==================== //
    // Compress files task
    gulp.task('build', ['build-js', 'build-css', 'copy-resources']);
    gulp.task('build-js', ['minify-js']);
    gulp.task('build-css', ['minify-css']);

    // ==================== MINIFY TASKS ==================== //
    // Minify Javascript files
    gulp.task('minify-js', ['concat-js', 'concat-js-with-jq'], function () {
        return gulp.src(['./dist/js/*.js'])
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/js/'));
    });

    // Minify css files
    gulp.task('minify-css', ['concat-css'], function () {
        return gulp.src(['./dist/css/*.css'])
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/css/'));
    });

    // ==================== CONCAT TASKS ==================== //
    // Concat Javascript files
    gulp.task('concat-js', function () {
        // Clean files
        del('./dist/*.min.js');

        // Minimum files
        return gulp.src(panda)
            .pipe(concat('panda.ui-' + version + '.js'))
            .pipe(gulp.dest('./dist/js/'));
    });

    // Concat Javascript files
    gulp.task('concat-js-with-jq', function () {
        // Clean files
        del('./dist/*.min.js');

        // Minimum files
        return gulp.src(['src/jquery/jquery-2.2.4.js'].concat(panda))
            .pipe(concat('panda.ui-' + version + '.jq.js'))
            .pipe(gulp.dest('./dist/js/'));
    });

    // Concat CSS files
    gulp.task('concat-css', function () {
        // Clean files
        del('./dist/**/*.min.css');

        // v1.1
        return gulp.src([
            'css/*.css'
        ])
            .pipe(concat('panda.ui-1.1.css'))
            .pipe(gulp.dest('./dist/css/'));
    });

    // ==================== COPY FLILES TASKS ==================== //
    // Copy all necessary resources
    gulp.task('copy-resources', function () {
        // Move the rest of the files in the dist folder
        return gulp.src(['./resources/**/*'], {base: './'})
            .pipe(gulp.dest('./dist/'));
    });
}());
