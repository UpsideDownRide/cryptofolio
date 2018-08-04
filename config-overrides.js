const { compose } = require('react-app-rewired')

module.exports = {
    webpack: compose(
        require('react-app-rewire-css-modules-extensionless').webpack({ /* options */ })
    ),
    jest: compose(
        require('react-app-rewire-css-modules-extensionless').jest()
    ),
}