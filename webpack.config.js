const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
entry: "./src/index.js",
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
},
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader', // step2- convert es6 to es5
            'eslint-loader'  // step1- check for linting issue
        ] 
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            'style-loader', // step3- inject style into dom
            'css-loader', // step2- convert css into coomon js
            'sass-loader' //step-1 convert scss into css
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
            'file-loader'
        ]
      }
    ]
},
plugins: [new HtmlWebPackPlugin({ 
   template: "./public/index.html" 
})]


};