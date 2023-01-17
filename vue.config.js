const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/vuetify-survey/',
  transpileDependencies: [
    'vuetify'
  ]
})
