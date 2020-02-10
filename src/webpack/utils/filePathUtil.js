/**
 * Created by VicSolWang.
 * Date: 2020-01-24 11:40
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs');
const path = require('path');

module.exports = {
	// Get the object-array of HTML files from the specified path.
	getHtmlFile: (srcPath) => {
		const srcFiles = fs.readdirSync(srcPath);
		return srcFiles
			.filter((item) => item.includes('.html'))
			.map((item) => ({
				name: item,
				path: path.resolve(srcPath, item),
			}));
	},
	// Get the object of JS files from the specified path.
	getJsFile: (
		srcPath,
		jsDirectory = '',
		fileName,
		extensions = ['js'],
		ignoreFiles = [],
	) => {
		const jsFileObj = {};
		const srcFiles = fs.readdirSync(path.join(srcPath, jsDirectory));
		srcFiles
			.filter((item) => !ignoreFiles.includes(item))
			.forEach((item) => {
				extensions.forEach((ext) => {
					let jsPath = '';
					if (item.includes(ext)) {
						if (item === `${fileName}.${ext}`) {
							jsPath = path.join(
								srcPath,
								jsDirectory,
								`${fileName}.${ext}`,
							);
						}
					} else {
						jsPath = path.join(
							srcPath,
							jsDirectory,
							item,
							`${fileName}.${ext}`,
						);
					}
					if (fs.existsSync(jsPath)) {
						jsFileObj[item.replace(/\.jsx*/, '')] = [jsPath];
					}
				});
			});
		return jsFileObj;
	},
};
