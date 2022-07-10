1. `npm init -y`
2. `npm i webpack webpack-cli --save-dev`
3. `npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`
4. `npm i react react-dom --save-dev`
5. `npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps` For design purpose
6. `npm install @mui/icons-material --legacy-peer-deps`
7. `npm install @babel/plugin-proposal-class-properties` for async and wait
8. `npm install react-router-dom`

Create `babel.config.json`

"""
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "17"
          }
        }
      ],
      "@babel/preset-react"
    ],
    "plugins": ["@babel/plugin-proposal-class-properties"]
  }
  

"""

Create `webpack.config.js`

"""
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};

"""

Make changes inside `package.json`

"""
"scripts": {
    "dev": "webpack --mode development --watch",
    "build": "webpack --mode production"
  },

"""

Create index.js, index.html, App.js