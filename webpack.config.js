const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js', // Arquivo de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica a regra em todos os arquivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Aplica a regra em todos os arquivos .css
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // O template do seu index.html
    }),
  ],
  devServer: {
    static: {
      // Substitui contentBase por static
      directory: path.join(__dirname, 'dist'), // Diretório de arquivos estáticos
    },
    compress: true,
    port: 9000,
    historyApiFallback: true, // Para lidar com rotas de SPA
  },
};
