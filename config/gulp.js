'use strict'
const path = require('path')
const gulp = require('gulp')
const typescript = require('gulp-typescript')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const src = 'assets'
const tscConfig = require(path.join(process.cwd(), src,'tsconfig.json'))
const dest = './.tmp/public'

module.exports = {

  defaultTaskName: 'default',

  tasks: {
    default: ['compile', 'copyLibs', 'copyAssets'],
    production: ['clean'],

    clean: () => {
      return del(dest)
    },
    compile: {
      dependsOf: ['clean'],
      task: () => {
        return gulp
          .src(path.join(src, 'app', '**', '*.ts'))
          .pipe(sourcemaps.init())          // <--- sourcemaps
          .pipe(typescript(tscConfig.compilerOptions))
          .pipe(sourcemaps.write('.'))      // <--- sourcemaps
          .pipe(gulp.dest(path.join(dest, 'app')))
      }
    },
    copyLibs: {
      dependsOf: ['clean'],
      task: () => {
        return gulp.src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js'
          ])
          .pipe(gulp.dest(path.join(dest, 'lib')))
      }
    },
    copyAssets : {
      dependsOf: ['clean'],
      task: () => {
        return gulp.src([path.join(src, 'app', '**', '*'), path.join(src, 'index.html'), path.join(src, 'styles.css'), path.join('!app', '**', '*.ts')], { base : src })
          .pipe(gulp.dest(dest))
      }
    }

  }

}
