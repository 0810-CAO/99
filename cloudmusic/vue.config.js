const path = require('path');
const webpack = require('webpack')
module.exports = {
    // 一般可以使用vue-cli中提供的配置文件修改，若需要自定义则通过configureWebpack来编写原生webpack配置
    outputDir: 'bundle',
    configureWebpack: {
        // 在该对象中编写原生
        //eg：添加版权
        plugins: [
            new webpack.BannerPlugin({
                banner: '曹承湘'
            })
        ]
    }
}