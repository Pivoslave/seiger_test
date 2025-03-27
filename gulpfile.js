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
    html: ["src/**/*.html", "!!src/partials/**/*.html"],
    styles: "src/css/**/*.css",
    scripts: "src/js/**/*.js",
    images: "src/img/**/*",
    partials: "src/partials/**/*.html",
    dist: "dist/"
};

// or fetch this one idk
const chapters = [
    {name: "Енергія вітру", color: "#e81e62", count: 187, notifications: 1},
    {name: "Сонячна енергія", color: "#f34236", count: 123},
    {name: "Гідроенергетика", color: "#663ab6", count: 98},
    {name: "Енергія приливів", color: "#2195f2", count: 86, notifications: 1},
    {name: "Енергія хвиль", color: "#00bbd3", count: 78},
    {name: "Геотермальна енергія", color: "#009587", count: 59},
    {name: "Розсіяна теплова енергія", color: "#4bae4f", count: 43, notifications: 1},
    {name: "Енергія біомаси", color: "#8cc737", count: 32},
    {name: "Енергія вітру", color: "#feea3b", count: 25},
    {name: "Сонячна енергія", color: "#fe9700", count: 18, notifications: 3},
    {name: "Гідроенергетика", color: "#c632e0", count: 9},
    {name: "Енергія приливів", color: "#bfc3de", count: 0},
];

const generateChaptersHTML = () => {

    let code = '';

    for(let chapter of chapters){

        let n =
            '<div class="chapter">' +
            `<div class="chapter-color" style="background-color: ${chapter.color}"></div>` +
            `<a href="#">${chapter.name} (${chapter.count})`  +
            '</a>' +
                (!chapter.notifications ? '' :
                    `<div class="notification">+${chapter.notifications}</div>`) +
            '</div>';

        code += n;
    }

    console.log(code);
    return code;
}

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
    chaptersHTML: generateChaptersHTML(),
};

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