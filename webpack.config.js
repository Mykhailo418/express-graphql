'use strict';

const webpack = require('webpack');
const mode = 'development';
const DEV_ENV = (mode == 'development') ? true : false;
const toPublic = './public/'

module.exports = {
	mode: mode,
	entry: {
		app: toPublic + 'js/app.js'
	},
	output: {
		path: __dirname  + '/public/comp',
		filename: "[name].js",
		library: "[name]"
	},

	watch: true,

	devtool: "source-map",

	plugins: [
		new webpack.DefinePlugin({
			DEV_ENV : DEV_ENV
 		}),
 	],

	module : {
		rules: [
      {
  			 test: /\.js$/,
  			 exclude: [/node_modules/],
         use: ['babel-loader']
  		}
		]
	}
}
