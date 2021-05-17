const { src, dest, watch, parallel, series } = require('gulp')

const sass = require('gulp-sass')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const del = require('del')


let styles = () => {
    return src('app/scss/style.sass')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
          overrideBrowserslist: ['last 10 version']
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

let scripts = () => {
    return src('app/js/main.js')
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('app/js'))
      .pipe(browserSync.stream())
}

let img = () => {
    return src('app/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}

let cleanDist =() => {
    return del('dist')
}

let watching = () => {
    watch(['app/scss/**/*.sass'], styles)
    watch(['app/js/main.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

let browsersync = () => {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
}

let build = ()=> {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}


exports.styles = styles     
exports.scripts = scripts
exports.watching = watching
exports.browsersync = browsersync
exports.cleanDist = cleanDist
exports.img = img

exports.build = series(cleanDist, img, build)
exports.default = parallel(styles, scripts, browsersync, watching)