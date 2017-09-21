var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractNeuronaleNetuez = new ExtractTextPlugin('neuron-netz.css');

module.exports = {
    entry: ['babel-polyfill', './src/main'],
    output: {
        path: __dirname + '/../src/main/assets-gen/static',
        filename: 'neuron-netz.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('babel-loader')
                ]
            },
            {
                test: /\.scss$/,
                loader: extractNeuronaleNetuez.extract('css?sourceMap!sass?sourceMap')
            },
            {
                test: /\.css?$/,
                loader: extractNeuronaleNetuez.extract('css?sourceMap!sass?sourceMap')
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/i,
                include: /node_modules/,
                loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
            },
            {
                test: /\.(gif|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
                // include: /node_modules\/alex-ui/,
                loader: 'file?name=assets/images/[name]-[hash].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=[name]-[hash].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name]-[hash].[ext]'
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                // exclude: /node_modules/,
                loader: 'file?name=[name]-[hash].[ext]'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        extractNeuronaleNetuez
    ]
};
