import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import { detectIos } from '@goldeimer/js-util'

import IosSwitch from '../../button/IosSwitch'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiListItemIcon-root': {
            color: '#757575'
        }
    },
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const ToggleSwitchListItem = ({
    iconComponent: IconComponent,
    isSelected,
    itemKey,
    label,
    onChange
}) => {
    const classes = useStyles()

    const nodeId = `label.${itemKey}`
    const switchProps = {
        'aria-labelledby': nodeId
    }

    const SwitchComponent = detectIos() ? IosSwitch : Switch

    return (
        <ListItem
            button
            className={classes.root}
            onClick={() => { onChange(itemKey) }}
        >
            {IconComponent && (
                <ListItemIcon>
                    <IconComponent size="small" />
                </ListItemIcon>
            )}
            <ListItemText
                className={classes.listItemText}
                id={nodeId}
                primary={label}
            />
            <ListItemSecondaryAction>
                <SwitchComponent
                    checked={isSelected}
                    color="primary"
                    edge="end"
                    inputProps={switchProps}
                    onChange={() => { onChange(itemKey) }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

ToggleSwitchListItem.propTypes = {
    iconComponent: PropTypes.elementType,
    isSelected: PropTypes.bool.isRequired,
    itemKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

ToggleSwitchListItem.defaultProps = {
    iconComponent: null
}

export default ToggleSwitchListItem
