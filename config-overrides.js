const { compose } = require('react-app-rewired')

module.exports = {
    webpack: compose(
        require('react-app-rewire-css-modules-extensionless').webpack({ /* options */ }),
        require('react-app-rewire-hot-loader'),
        require('react-app-rewire-preload-plugin')
    ),
    jest: compose(
        require('react-app-rewire-css-modules-extensionless').jest()
    ),
}