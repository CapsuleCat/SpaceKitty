const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');

gulp.task('default', (callback) => {
    webpack({
        entry:  path.join(__dirname, 'src', 'index.js'),
        output: {
          path: path.join(__dirname, 'lib'),
          publicPath: '/',
          filename: 'index.js',
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
      }, function (err, stats) {
        if (err) {
          console.log(err);  
        }

        callback();
      });
});