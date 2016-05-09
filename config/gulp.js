'use strict'
const path = require('path')
const gulp = require('gulp')
const typescript = require('gulp-typescript')
const del = require('del')
const watch = require('gulp-watch')
const sourcemaps = require('gulp-sourcemaps')
const src = 'assets'
const tscConfig = require(path.join(process.cwd(), src,'tsconfig.json'))
const dest = './.tmp/public'

module.exports = {

  defaultTaskName: 'default',

  tasks: {
    default: ['compile', 'copyLibs', 'copyAssets', 'watch'],
    production: ['clean'],

    clean: () => {
      return del(dest)
    },
    watch: () => {
      const tscSource = path.join(src, 'app', '**', '*')
      return gulp.watch(tscSource, ['compile', 'copyLibs', 'copyAssets'])
    },
    compile: {
      dependsOf: ['clean'],
      task: () => {
        const tscSource = path.join(src, 'app', '**', '*.ts')
        return gulp
          .src(tscSource)
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
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.dev.js'
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
