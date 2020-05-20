const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    }
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html")
    })
  ]
}
