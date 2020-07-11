import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import useClipboard from '@lib/hooks/useClipboard'

const useStyles = makeStyles(() => ({
    list: {
        padding: 0
    },
    textarea: {
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: 'hidden'
    }
}))

const CopyTextList = ({ renderItems }) => {
    const { copyText, textareaRef } = useClipboard()

    const classes = useStyles()

    const handleCopy = async (text) => {
        try {
            await copyText(text)
        } catch (_) {
            // TODO: Handle.
        }
    }

    return (
        <>
            <textarea className={classes.textarea} ref={textareaRef} />
            <List dense className={classes.list}>
                {renderItems && renderItems(handleCopy)}
            </List>
        </>
    )
}

CopyTextList.propTypes = {
    renderItems: PropTypes.func
}

CopyTextList.defaultProps = {
    renderItems: null
}

export default CopyTextList