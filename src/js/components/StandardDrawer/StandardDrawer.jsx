import React from 'react'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import useCloseableRoutedOverlay from 'hooks/useCloseableRoutedOverlay'

import propTypesCloseableRoutedOverlay from
    'propTypes/propTypesCloseableRoutedOverlay'

const StandardDrawer = ({
    children,
    routeOnClose = '/',
    shouldBeOpen = true
}) => {
    const {
        isOpen,
        handleClose,
        handleOpen
    } = useCloseableRoutedOverlay(shouldBeOpen)

    const iOS = (
        process.browser &&
        /iPad|iPhone|iPod/.test(navigator.userAgent)
    )

    return (
        <SwipeableDrawer
            anchor="left"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            {children}
        </SwipeableDrawer>
    )
}

StandardDrawer.propTypes = propTypesCloseableRoutedOverlay

export default StandardDrawer
