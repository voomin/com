const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

const config = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/index.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'voomin',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        subpage: 'src/index.js'
    },

    configureWebpack: (webpackConfig) => {
        // alias 설정
        webpackConfig.resolve.alias.util = resolve('src/cmn/util');
        // .set('sass', resolve('src/assets/sass'))
        // .set('util', resolve('src/cmn/util'));
    }
};

module.exports = config;
