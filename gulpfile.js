'use strict';

(function () {
    // Initialize variables
    var gulp = require('gulp');
    var del = require('del');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    var cleanCSS = require('gulp-clean-css');

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
        return gulp.src([
            // Panda Ui
            'src/panda/Ui.js',

            // DOM / HTML modules
            'src/panda/DOM.js',
            'src/panda/HTML/Weblink.js',
            'src/panda/HTML/HTMLFrame.js',

            // Common modules
            'src/panda/DataTable.js',
            'src/panda/Navigation.js',
            'src/panda/Notification.js',
            'src/panda/PageNotification.js',
            'src/panda/Popup.js',
            'src/panda/Scrollable.js',
            'src/panda/Tooltip.js',
            'src/panda/WindowFrame.js',

            // Form module
            'src/panda/Forms.js',
            'src/panda/Forms/SwitchButton.js',

            // Form Control module
            'src/panda/Forms/Controls.js',
            'src/panda/Forms/Controls/FromElement.js',
            'src/panda/Forms/Controls/FormButton.js',
            'src/panda/Forms/Controls/FormInput.js',
            'src/panda/Forms/Controls/FormLabel.js',
            'src/panda/Forms/Controls/SwitchButton.js',

            // Main files
            'src/panda/Init.js'
        ])
            .pipe(concat('panda.ui-1.1.js'))
            .pipe(gulp.dest('./dist/js/'));
    });

    // Concat Javascript files
    gulp.task('concat-js-with-jq', function () {
        // Clean files
        del('./dist/*.min.js');

        // Minimum files
        return gulp.src([
            // jQuery
            'src/jquery/jquery-2.2.4.js',

            // Panda Ui
            'src/panda/Ui.js',

            // DOM / HTML modules
            'src/panda/DOM.js',
            'src/panda/HTML/Weblink.js',
            'src/panda/HTML/HTMLFrame.js',

            // Common modules
            'src/panda/DataTable.js',
            'src/panda/Navigation.js',
            'src/panda/Notification.js',
            'src/panda/PageNotification.js',
            'src/panda/Popup.js',
            'src/panda/Scrollable.js',
            'src/panda/Tooltip.js',
            'src/panda/WindowFrame.js',

            // Form module
            'src/panda/Forms.js',
            'src/panda/Forms/SwitchButton.js',

            // Form Control module
            'src/panda/Forms/Controls.js',
            'src/panda/Forms/Controls/FromElement.js',
            'src/panda/Forms/Controls/FormButton.js',
            'src/panda/Forms/Controls/FormInput.js',
            'src/panda/Forms/Controls/FormLabel.js',
            'src/panda/Forms/Controls/SwitchButton.js',

            // Main files
            'src/panda/Init.js'
        ])
            .pipe(concat('panda.ui-1.1.jq.js'))
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
