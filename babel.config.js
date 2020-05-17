module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        indent:['off', 2],
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
        'space-before-function-paren': 0,
        'space-before-clocks': 0,
        'key-spacing':0
      }
    ]
  ]
}
