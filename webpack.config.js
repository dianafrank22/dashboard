const path    = require("path");
const webpack = require('webpack');

module.exports = {
	context: __dirname + "/src",
	entry:{
		javascript: "./app.js",
		html: "./index.html"
	},
	output: {
		filename: "app.js",
		path: __dirname + "/dist"
	},
	module:{
		loaders:[
		{
		  test: /\.js$/,
          exclude: /node_modules/,
          loader:"babel-loader",
          query:
          {
            presets:['es2015', 'react']
          }
		},
        {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader?root=.",
        },
        {
           test: /\.(png|jpg)$/,
           loader: 'url?limit=25000', 
        }]

	}
}