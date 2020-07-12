import { createMuiTheme } from '@material-ui/core/styles'

import 'img/favicon/goldeimer.favicon.png'
import 'img/favicon/vca.favicon.png'

import GoldeimerIcon from '@map/icons/brands/GoldeimerIcon'
import VivaConAguaIcon from '@map/icons/brands/VivaConAguaIcon'

const COLOR_PRIMARY_GOLDEIMER = '#ffe300'
const COLOR_PRIMARY_VIVA_CON_AGUA = '#008fc3'

const TYPOGRAPHY_VENEER = {
    fontFamily: 'veneer'
}

const makeTheme = (
    colorPrimary = COLOR_PRIMARY_GOLDEIMER,
    fontStyleEmphasis = TYPOGRAPHY_VENEER
) => createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            drawer: 449,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: {
            main: colorPrimary
        },
        secondary: {
            main: '#000'
        },
        tonalOffset: 0.3
    },
    typography: {
        fontFamily: 'museo',
        h1: fontStyleEmphasis,
        h2: fontStyleEmphasis,
        h3: fontStyleEmphasis,
        h4: fontStyleEmphasis,
        h5: fontStyleEmphasis,
        h6: fontStyleEmphasis,
        button: {
            ...fontStyleEmphasis,
            fontSize: '1rem'
        }
    },
    overrides: {
        MuiListItemIcon: {
            root: {
                minWidth: 48,
                '&.tight': {
                    minWidth: 40
                },
                '&.tighter': {
                    minWidth: 36
                },
                '&.tightest': {
                    minWidth: 32
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                fontWeight: 700
            }
        },
        MuiTypography: {
            h6: {
                '&.small': {
                    fontSize: '1.125rem'
                }
            }
        }
    }
})

const THEME = {
    Goldeimer: {
        id: 'goldeimer',
        favicon: 'img/favicon/goldeimer.favicon.png',
        logoIconComponent: GoldeimerIcon,
        mui: makeTheme(COLOR_PRIMARY_GOLDEIMER)
    },
    VivaConAgua: {
        id: 'viva-con-agua',
        favicon: 'img/favicon/vca.favicon.png',
        logoIconComponent: VivaConAguaIcon,
        mui: makeTheme(COLOR_PRIMARY_VIVA_CON_AGUA)
    }
}

const getTheme = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('theme') && urlParams.get('theme') === 'viva-con-agua') {
        return THEME.VivaConAgua
    }

    return THEME.Goldeimer
}

const defaultTheme = THEME.Goldeimer

export {
    defaultTheme as default,
    getTheme,
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA,
    THEME
}
