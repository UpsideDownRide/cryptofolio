const { compose } = require('react-app-rewired')

module.exports = {
    webpack: compose(
        require('react-app-rewire-css-modules-extensionless').webpack({ /* options */ }),
        require('react-app-rewire-hot-loader')
    ),
    jest: compose(
        require('react-app-rewire-css-modules-extensionless').jest()
    ),
}