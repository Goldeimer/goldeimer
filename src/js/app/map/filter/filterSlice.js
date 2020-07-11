import { createSlice } from '@reduxjs/toolkit'

import combineSlices from '@lib/redux/combineSlices'

import TAXONOMIES from '@map/taxonomies'

const toggleImpl = (state, term, oneWayIndicator = null) => {
    const idx = state.indexOf(term)

    if (idx === -1) {
        if ([null, true].includes(oneWayIndicator)) {
            state.push(term)
        }

        return
    }

    if ([null, false].includes(oneWayIndicator)) {
        state.splice(idx, 1)
    }
}

const makeToggleListSlice = ({ name, initialState = [] }) => createSlice({
    name,
    initialState,
    reducers: {
        add: (state, { payload }) => toggleImpl(state, payload, true),
        clear: (state) => [],
        remove: (state, { payload }) => toggleImpl(state, payload, false),
        reset: () => initialState,
        toggle: (state, { payload }) => toggleImpl(state, payload)
    }
})

const filter = combineSlices(
    TAXONOMIES.reduce((acc, { taxonomyId, terms }) => ({
        ...acc,
        [taxonomyId]: makeToggleListSlice({
            name: taxonomyId,
            initialState: terms.map(({ termId }) => (termId))
        })
    }), {})
)

const FILTER = filter.actions

export {
    FILTER,
    filter
}
