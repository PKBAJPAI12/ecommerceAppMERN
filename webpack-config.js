const path = require('path');

module.exports = {
  // Entry point of your application
  entry: './backend/server.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // Directory for the output files
    filename: 'bundle.js' // Output bundle file name
  },

  // Module rules
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript files
          options: {
            presets: ['@babel/preset-env'] // Use preset-env for modern JavaScript features
          }
        }
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'] // Use style-loader and css-loader to process CSS files
      }
    ]
  },

  // Development mode
  mode: 'development'
};
