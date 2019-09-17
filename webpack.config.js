const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => {
    const mode = env.mode;
    return {
        entry: "./src/js/index.js",
        output: {
            filename: "js/main.js"
        },
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte")
            },
            extensions: [".mjs", ".js", ".svelte"],
            mainFields: ["svelte", "browser", "module", "main"]
        },
        mode,
        devtool: "none",
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
                    }
                },
                {
                    test: /\.svelte$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "svelte-loader",
                            options: {
                                emitCss: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "../"
                            }
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
