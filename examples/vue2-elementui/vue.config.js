const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 5262
  },
  transpileDependencies: true
})
