const devDir = 'dev';
const publicDir = 'public';
const wpDir = 'wp-content/themes/theme_name_folder'; //path to theme root folder

module.exports = {
	wpDir,
	publicDir,
	devDir,
	assetsDir: `${devDir}/assets`,
	imagesDir: {
		entry: `${publicDir}/images`,
		output: `${publicDir}/images`
	},
	scssDir: {
		entry: `${devDir}/scss`,
		output: `${publicDir}/css`,
		mainFileName: 'style',
		mainFileOutput: publicDir
	},
	pugDir: {
		entry: devDir,
		output: publicDir
	},
	jsDir: {
		entry: `${devDir}/js`,
		output: `${publicDir}/js`
	},
	jsES6: {
		entry: `${devDir}/js/es6`,
		names: ['main']
	},
	wpDevDir: {
		outputFonts: `${wpDir}/fonts/`,
		outputjs: `${wpDir}/js/`
	}
};
