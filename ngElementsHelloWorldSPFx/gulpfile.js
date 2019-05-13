'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
// build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// build.configureWebpack.mergeConfig({
//     additionalConfiguration: (generatedConfiguration) => {
//         generatedConfiguration.module.rules.push(
//             {
//                 test: /\.js$/,
//                 use: ["source-map-loader"],
//                 enforce: "pre"
//             },
//             {
//                 test: /\.ts$/,
//                 loader: '@ngtools/webpack'
//             },
//             {
//                 test: /\.scss$/,
//                 use: ['raw-loader', 'sass-loader']
//             },
//             {
//                 test: /\.css$/,
//                 use: ['to-string-loader', 'css-loader'],
//                 // exclude: [helpers.root('src', 'styles')]
//             },
//             {
//                 test: /\.(gif|ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])$/,
//                 loader: "file-loader",
//             },
//             {
//                 test: /\.html$/,
//                 loader: 'raw-loader'
//             }

//         );

//         return generatedConfiguration;
//     }
// });

build.initialize(gulp);




// 'use strict';

// const gulp = require('gulp');
// const build = require('@microsoft/sp-build-web');
// const path = require('path');
// // const merge = require('webpack-merge');
// const { AngularCompilerPlugin } = require('@ngtools/webpack');

// //TODO: factor this out into an npm package
// build.configureWebpack.mergeConfig({
//     additionalConfiguration: (generatedConfiguration) => {
//         Object.assign(generatedConfiguration.resolve, { extensions: ['.ts', '.js'] });
//         generatedConfiguration.module.rules = [
//             {
//                 test: /\.ts$/,
//                 loader: '@ngtools/webpack'
//             },
//             {
//                 test: /\.scss$/,
//                 use: ['raw-loader', 'sass-loader']
//             },
//             {
//                 test: /\.css$/,
//                 use: ['to-string-loader', 'css-loader'],
//                 // exclude: [helpers.root('src', 'styles')]
//             },
//             {
//                 test: /\.(gif|svg|jpg|png)$/,
//                 loader: "file-loader",
//             },
//             {
//                 test: /\.html$/,
//                 loader: 'raw-loader'
//             }
//         ];

//         generatedConfiguration.plugins.push(new AngularCompilerPlugin({
//             tsConfigPath: path.resolve('./tsconfig.json')
//         }))
//         return generatedConfiguration;
//     }
// });


// build.typescript.enabled = false;
// build.tslint.enabled = false;

// build.initialize(gulp);