const path = require('path');

module.exports = {
  webpack: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    },
  },
  babel: {
    plugins: [
      'babel-plugin-macros',
    ],
    presets: [
      // Babel 프리셋
    ],
  },
};