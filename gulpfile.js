const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");
const newer = require("gulp-newer");
const path = require("path");
const browserSync = require("browser-sync").create();
const fileInclude = require('gulp-file-include');

const paths = {
    html: "src/**/*.html",
    styles: "src/css/**/*.css",
    scripts: "src/js/**/*.js",
    images: "src/img/**/*",
    partials: "src/partials/**/*.html",
    dist: "dist/"
};

const globalVariables = {
    views: 1269,
    comments: 26,
    shares: 72,
    avatar: "img/test-login-pic.png",
    author: "aeroboy123",
    date: "25 бер. 2023",
    header: "Заголовок за замовчуванням",
    text: "Текст за замовчуванням",
    stripcolor: "black",
    category: "Категорія 0",
    preview: "Текст-прев'ю за замовчуванням",
    bg_url: "../../img/article-bgs/vitryaky.png",
}

function styles() {
    return gulp.src(paths.styles)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(`${paths.dist}css`))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src(paths.html)
        .pipe(fileInclude(
            {
                prefix:"@@",
                basepath:"@file",
                context: globalVariables
            }
        ))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.scripts)
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(terser())
        .pipe(gulp.dest(`${paths.dist}js`))
        .pipe(browserSync.stream());
}

async function images(){
    const imagemin = (await import("gulp-imagemin")).default;

    return gulp.src(paths.images, {encoding: false})
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.dist}img`))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({ server: { baseDir: paths.dist } });

    gulp.watch(paths.styles, styles);
    gulp.watch(paths.scripts, scripts);
    gulp.watch(paths.html, html);
    gulp.watch(paths.partials, html);
    gulp.watch(paths.images, images);
}

const build = gulp.series(gulp.parallel(styles, html, scripts, images), serve);

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.serve = serve;
exports.default = build;