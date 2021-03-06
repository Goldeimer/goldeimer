const { BuildTarget } = require('@goldeimer/build-util')

module.exports = (buildTarget) => {
    switch (buildTarget) {
    case BuildTarget.ESM:
        return 'es6'

    case BuildTarget.CJS:
    case BuildTarget.UMD:
        return 'browserslist'

    default:
        return 'web'
    }
}
