const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, '../src'),
	dist: path.resolve(__dirname, '../dist'),
	assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pages`;
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter(fileName => fileName.endsWith(".pug"));

module.exports = {
	externals: {
		paths: PATHS,
	},
	entry: {
		app: `${PATHS.src}/app.js`,
		index: [`${PATHS.src}/pages/index/index.js`],
		privacyPolicy: `${PATHS.src}/pages/privacy-policy/privacy-policy.js`
	},
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			//            {
			//                test: /\.css$/,
			//                use: [
			//                    'style-loader',
			//                    {
			//                        loader: MiniCssExtractPlugin.loader,
			//                        options: {publicPath: '../../'},
			//                    },
			//                    {
			//                        loader: 'css-loader',
			//                        options: { sourceMap: true }
			//                    },
			//                    {
			//                        loader: 'postcss-loader',
			//                        options: { sourceMap: true, config: {path: `./postcss.config.js`}, },
			//                    },
			//                    {
			//                        loader: 'sass-loader',
			//                        options: { sourceMap: true }
			//                    },
			//                ],
			//            },
			{
				test: /\.s?css$/,
				use: [

					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options:
						{
							publicPath: '../../',
							minify: false
						},
					},
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},

					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: { path: `./postcss.config.js` }, },
					},

					{
						loader: 'resolve-url-loader',
						options: {}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				],
				//exclude: '/node_modules/',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				//exclude: `${PATHS.src}/components/_common/fonts/`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/img/',
							//publicPath: 'assets/img/',
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 100
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.90, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 90
							}
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, //removed .svg here so that images are not damaged
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/fonts/',
				},
			},
		],
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`,
		}),
		new CopyWebpackPlugin({
			patterns: [
				//{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
				//{ from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
				{ from: `${PATHS.src}/components/static/favicon.ico`, to: `${PATHS.assets}img` },
			],
		}),
		//        ...PAGES.map(
		//            page =>
		//              new HtmlWebpackPlugin({
		//                template: `${PAGES_DIR}/${page}`,
		//                filename: `./${page.replace(/\.pug/,'.html')}`
		//              })
		//         ),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/index/index.pug`,
			filename: './index.html',
			inject: true,
			chunks: ['index', 'app'],
			minify: false,
		}),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/privacy-policy/privacy-policy.pug`,
			filename: './privacy-policy.html',
			inject: true,
			chunks: ['privacyPolicy', 'app'],
			minify: false,
		}),

		// Used the ProvidePlugin constructor to inject jquery implicit globals
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery'",
			"window.$": "jquery",
		}),
	],
	resolve: {
		//extensions: [],
		alias: {
			//	'@styles': path.resolve(__dirname, `${PATHS.src}/styles`),
			'~': PATHS.src,
			'*': `PATHS.src/components`,
		}
	},
}