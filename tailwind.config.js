const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/builders/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/components/**/*.{erb,haml,html,slim}',
    './app/assets/javascripts/components/**/*.{js,jsx}'
  ],
  safelist: [
    { pattern: /flash-message-(notice|alert|info)/ },
    { pattern: /invisible|hidden|field-with-errors|required|pagination-button|pagination|form-richtext/ },
    { pattern: /bg-icon-(zip|png|pdf|jpg|doc|html|mov)/ }
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' }
    },
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10'
      },
      backgroundImage: {
        'icon-png': 'url("./icons/png/file-types/png.png")',
        'icon-html': 'url("./icons/png/file-types/html.png")',
        'icon-doc': 'url("./icons/png/file-types/doc.png")',
        'icon-pdf': 'url("./icons/png/file-types/pdf.png")',
        'icon-zip': 'url("./icons/png/file-types/zip.png")',
        'icon-jpg': 'url("./icons/png/file-types/jpg.png")',
        'icon-mov': 'url("./icons/png/file-types/mov.png")'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        opensans: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-font-inter'),
    require('@tailwindcss/line-clamp')
  ]
}
