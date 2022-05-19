let project_folder = "..";
let source_folder = "#src";

let fs = require('fs');

let path = {
	build: {
		css: project_folder + "/",
		js: project_folder + "/js/",
		images: project_folder + "/images/",
		fonts: project_folder + "/fonts/"
	},
	src: {
		css: source_folder + "/scss/style.scss",
		js: source_folder + "/js/jquery.main.js",
		images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/**/*"
	},
	watch: {
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/**/*"
	}
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	fileinclude = require("gulp-file-include"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp");

//css
function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
	// .pipe(clean_css())
	// .pipe(
	// 	rename({
	// 		extname: ".min.css"
	// 	})
	// )
	// .pipe(dest(path.build.css))
}

//js
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
}

//js
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
}

//images
function images() {
	return src(path.src.images)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
}

// fonts
function fonts(params) {
	src(path.src.fonts)
		.pipe(dest(path.build.fonts));
}

// watch
function watchFiles(params) {
	gulp.watch([path.watch.css], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.images], images)
	gulp.watch([path.watch.fonts], fonts)
}

let build = gulp.series(gulp.parallel(css, js, images, fonts));
let watch = gulp.parallel(build, watchFiles);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;