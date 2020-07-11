import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import NearMeIcon from '@material-ui/icons/NearMe'

import { CONTEXT_TYPE } from '@map/context'

const useStyles = makeStyles(({ spacing }) => ({
    nearMeIcon: {
        marginLeft: 3,
        marginRight: spacing(2) + 2
    }
}))

const getNearBySectionTitleByContextType = (contextType) => {
    switch (contextType) {
    case CONTEXT_TYPE.feature.is(contextType):
        return 'Weitere Händler in der Umgebung'

    case CONTEXT_TYPE.currentLocation.is(contextType):
        return 'Händler nahe deines Standorts'

    case CONTEXT_TYPE.geocodingResult.is(contextType):
        return 'Händler nahe deines Standorts'

    default:
        return 'In der Umgebung'
    }
}

const NearBySection = ({
    contextType,
    latitude,
    longitude
}) => {
    const classes = useStyles()

    return (
        <Box
            alignItems='center'
            display='flex'
            p={2}
        >
            <NearMeIcon
                className={classes.nearMeIcon}
                color='primary'
                fontSize='large'
            />
            <Typography
                component='h2'
                variant='h6'
            >
                {getNearBySectionTitleByContextType(contextType)}
            </Typography>
        </Box>
    )
}

NearBySection.propTypes = {
    contextType: PropTypes.oneOfType([
        PropTypes.number, // Enum.value
        PropTypes.shape({
            get: PropTypes.func,
            has: PropTypes.func,
            is: PropTypes.func,
            toString: PropTypes.func,
            valueOf: PropTypes.func
        })
    ]).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

export default NearBySection