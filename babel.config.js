const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "usage",
            corejs: 3
        }
    ]
];

const plugins = [
    "transform-custom-element-classes"
];

module.exports = { presets, plugins };
