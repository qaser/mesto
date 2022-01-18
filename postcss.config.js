const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
