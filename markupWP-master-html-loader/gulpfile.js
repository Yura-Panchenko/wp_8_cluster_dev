'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'webpack', 'autoprefixer', 'del']
});
let isDevelopment = true;
const path = require('path');
const webpackconfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const settings = require('./gulp-settings.js');
const postcssPlagins = [
	plugins.autoprefixer({
		browsers: ['last 2 version']
	})
];

// ES-2015 handler
gulp.task('webpack', (cb) => {
	plugins.webpack(webpackconfig(isDevelopment), (err, stats) => {
		if (err) throw new plugins.util.PluginError('webpack', err);
		plugins.util.log('[webpack]', stats.toString({}));
		cb();
	});
});

const reloadPage = (cb) => {
	browserSync.reload();
	cb();
}

// compile from sass to css
gulp.task('allSass', () => {
	const entryDir = settings.scssDir.entry;

	return gulp.src(
		path.resolve(__dirname, entryDir + '/**/*.scss'),
		{
			base: entryDir
		}
	)
		.pipe(plugins.cached('allSass'))
		.pipe(plugins.sassMultiInheritance({ dir: entryDir + '/' }))
		.pipe(plugins.plumber(function (error) {
			plugins.util.log(plugins.util.colors.bold.red(error.message));
			plugins.util.beep();
			this.emit('end');
		}))
		.pipe(plugins.if(isDevelopment, plugins.sourcemaps.init()))
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		//.pipe(plugins.groupCssMediaQueries())
		.pipe(plugins.postcss(postcssPlagins))
		.pipe(plugins.if(isDevelopment, plugins.sourcemaps.write('./')))
		.pipe(plugins.plumber.stop())
		.pipe(gulp.dest(function (file) {
			return file.stem === settings.scssDir.mainFileName || file.stem === settings.scssDir.mainFileName + '.css' ?
				path.resolve(__dirname, settings.scssDir.mainFileOutput) :
				path.resolve(__dirname, settings.scssDir.output);
		}))
		.pipe(plugins.count('## files sass to css compiled', { logFiles: true }))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

// mincss and group media
gulp.task('pur', function () {
	return gulp.src(path.resolve(__dirname, settings.scssDir.mainFileOutput + '/style.css'))
		.pipe(plugins.cssPurge({
			trim: false,
			shorten: true,
			short_zero: true,
			short_hexcolor: true,
			short_font: true,
			short_background: true,
			short_border: true,
			format: true,
			format_font_family: false,
			verbose: false
		}))
		.pipe(gulp.dest(path.resolve(__dirname, settings.scssDir.mainFileOutput)));
});

// mincss and group media
gulp.task('purmin', function () {
	return gulp.src(path.resolve(__dirname, settings.scssDir.mainFileOutput + '/style.css'))
		.pipe(plugins.cssPurge({
			trim: false,
			shorten: true,
			short_zero: true,
			short_hexcolor: true,
			short_font: true,
			short_background: true,
			short_border: true,
			format: true,
			format_font_family: false,
			verbose: false
		}))
		.pipe(gulp.dest(path.resolve(__dirname, settings.scssDir.mainFileOutput)))
		.pipe(plugins.cssPurge({
			trim: true
		}))
		.pipe(plugins.rename({
			extname: ".min.css"
		}))
		.pipe(gulp.dest(path.resolve(__dirname, settings.scssDir.mainFileOutput)));
});

// server
gulp.task('server', cb => {
	browserSync.init({
		server: {
			baseDir: settings.publicDir,
			port: 3010,
			directory: true,
			notify: false
		}
	}, cb);
});

gulp.task('copyScripts', () => {
	return gulp.src(
		[
			path.resolve(__dirname, settings.jsDir.entry + '/**/*.*'),
			'!' + path.resolve(__dirname, settings.jsES6.entry + '/**/*.*')
		],
		{
			base: path.resolve(__dirname, settings.jsDir.entry)
		}
	)
		.pipe(plugins.cached('copyScripts'))
		// .pipe(minify({
		// 	ignoreFiles: ['*.min.js']
		// }))
		.pipe(gulp.dest(settings.jsDir.output))
		.pipe(plugins.count('## JS files was copied', { logFiles: true }));
});

gulp.task('htmlBuild', function () {
	return gulp.src(path.resolve(__dirname, settings.htmlDir.entry + '/*.html'),
		{
			base: path.resolve(__dirname, settings.htmlDir.entry)
		}
	)
		.pipe(plugins.rigger())
		.pipe(gulp.dest(settings.htmlDir.output))
		.pipe(plugins.count('## html files was build', { logFiles: true }));
});

// image optimization
gulp.task('imagesOptimize', () => {
	const entry = path.resolve(__dirname, settings.imagesDir.entry + '/**/*.+(png|jpg|gif)');
	const output = path.resolve(__dirname, settings.imagesDir.output);

	return gulp.src(
		entry,
		{
			base: path.resolve(__dirname, settings.imagesDir.entry)
		}
	)
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(output))
		.pipe(plugins.count('## images was optimize', { logFiles: true }));
});

gulp.task('assets', (cb) => {
	return gulp.src(
		path.resolve(__dirname, settings.assetsDir + '/**'),
		{
			base: path.resolve(__dirname, settings.assetsDir)
		}
	)
		.pipe(plugins.cached('assets'))
		.pipe(gulp.dest(path.resolve(__dirname, settings.publicDir)))
		.pipe(plugins.count('## assets files copied', { logFiles: true }));
});

gulp.task('watch', function (cb) {
	gulp.watch(
		path.resolve(__dirname, settings.scssDir.entry + '/**/*.scss'),
		gulp.series('allSass')
	).on('unlink', function (filePath) {
		delete plugins.cached.caches.allSass[path.resolve(filePath)];
	});

	gulp.watch(path.resolve(__dirname, settings.htmlDir.entry + '/**/*.html'),
		gulp.series('htmlBuild')
	).on('unlink', function (filePath) {
		delete plugins.cached.caches.htmlBuild[path.resolve(filePath)];
	});

	gulp.watch(
		[
			path.resolve(__dirname, settings.jsDir.entry + '/*'),
			'!' + path.resolve(__dirname, settings.jsES6.entry)
		],
		gulp.series('copyScripts')
	).on('unlink', function (filePath) {
		delete plugins.cached.caches.copyScripts[path.resolve(filePath)];
	});

	// gulp.watch(
	// 	path.resolve(__dirname, settings.jsES6.entry + '/**/*.js'),
	// 	gulp.series('webpack')
	// );

	gulp.watch(
		path.resolve(__dirname, settings.assetsDir + '/**'),
		gulp.series('assets')
	).on('error', () => { })
		.on('unlink', function (filePath) {
			delete plugins.cached.caches.assets[path.resolve(filePath)];
		});

	gulp.watch(
		[
			path.resolve(__dirname, settings.jsDir.output + '/*.js'),
			path.resolve(__dirname, settings.publicDir + '/*.html')
		],
		gulp.series(reloadPage)
	);
	cb();
});

gulp.task('clear', (cb) => {
	plugins.del(path.resolve(__dirname, settings.publicDir), { read: false }).then(paths => {
		cb();
	});
});

/*
gulp.task('build', gulp.parallel(
	'assets',
	'copyScripts',
	'webpack',
	'allSass',
	'pugPages'
));
*/

gulp.task('build', gulp.parallel(
	'assets',
	'htmlBuild',
	'copyScripts',
	'allSass'
));

gulp.task('distmin', gulp.series(
	(cb) => {
		isDevelopment = false;
		cb();
	},
	'clear',
	'build',
	'purmin',
	gulp.parallel('imagesOptimize')
));

gulp.task('dist', gulp.series(
	(cb) => {
		isDevelopment = false;
		cb();
	},
	'clear',
	'build',
	'pur',
	gulp.parallel('imagesOptimize')
));

gulp.task('default', gulp.series('build', 'server', 'watch'));

