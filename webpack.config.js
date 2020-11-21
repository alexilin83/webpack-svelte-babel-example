const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => {
    const isDev = env.development ? true : false;
    return {
        entry: "./src/js/index.js",
        output: {
            filename: "js/main.js",
            path: path.resolve(process.cwd(), 'dist')
        },
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte")
            },
            extensions: [".mjs", ".js", ".svelte"],
            mainFields: ["svelte", "browser", "module", "main"]
        },
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'cheap-module-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(js|mjs|svelte)$/,
                    include: [
                        path.resolve(__dirname, "src"),
                        path.resolve(__dirname, "node_modules/svelte")
                    ],
                    use: {
                        loader: "babel-loader"
                    },
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.svelte$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "svelte-loader",
                            options: {
                                preprocess: require('svelte-preprocess')({})
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : {
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: '../'
							},
						},
                        "css-loader"
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: "Svelte App",
                template: "./src/index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "css/[name].css"
            })
        ]
    };
};
