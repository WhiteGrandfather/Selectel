"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var ttf2woff = require('gulp-ttf2woff');
var ttf2woff2 = require('gulp-ttf2woff2');
var pug = require("gulp-pug");
var stylus = require('gulp-stylus');

gulp.task("pug", function () {
  return gulp.src("source/pug/*.pug")
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("ttf2woff2", function(){
  return gulp.src(["source/fonts/*.ttf"])
    .pipe(ttf2woff2())
    .pipe(gulp.dest("source/fonts/"));
});

gulp.task("ttf2woff", function(){
  return gulp.src(["source/fonts/*.ttf"])
    .pipe(ttf2woff())
    .pipe(gulp.dest("source/fonts/"));
});

gulp.task("ttf-convert", gulp.series(
  "ttf2woff",
  "ttf2woff2"
));

gulp.task("compress-js", function () {
  return pipeline(
        gulp.src("source/js/*.js"),
        sourcemap.init(),
        uglify(),
        rename(function (path) {
          path.basename += "-min";
        }),
        sourcemap.write("."),
        gulp.dest("build/js")
  );
});

gulp.task("minify", function () {
  return pipeline(
        gulp.src("source/*.html"),
        sourcemap.init(),
        htmlmin({ collapseWhitespace: true }),
        sourcemap.write("."),
        gulp.dest("build")
  );
});

gulp.task("html-include", function () {
  return gulp.src("build/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy-html", function () {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    "source/*.png",
    "source/*.json"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
 });

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 7}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css-copy", function () {
  return gulp.src("source/css/*.css")
  .pipe(csso())
  .pipe(rename(function (path) {
    path.basename += "-min";
  }))
  .pipe(gulp.dest("build/css"));
})

gulp.task("css", function () {
  return gulp.src("source/stylus/style.styl")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(stylus())
    .pipe(postcss([
      autoprefixer()
    ]))
    // .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/stylus/**/*.styl", gulp.series("css", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html-include", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("compress-js", "refresh"));
  gulp.watch("source/pug/**", gulp.series("pug", "html-include", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "sprite",
  "pug",
  "html-include",
  "css-copy",
  "css",
  "compress-js"
));

gulp.task("start", gulp.series("build", "server"));
