import { createSlice } from '@reduxjs/toolkit'

import sourceRequest from 'api/map/source'
import LOADING from 'enum/loading'
import combineSlices from 'util/redux/combineSlices'
import createAsyncSlice from 'util/redux/createAsyncSlice'

import {
    transformGeoJsonFeaturesToMarkerProps
} from 'util/map/transformations'

const INITIAL_SELECTED = null
const selected = createSlice({
    name: 'selected',
    initialState: INITIAL_SELECTED,
    reducers: {
        reset: () => INITIAL_SELECTED,
        set: (_, action) => action.id
    }
})

const INITIAL_SOURCE = {
    error: null,
    features: [],
    loading: LOADING.idle,
    receivedAt: null
}
const source = createAsyncSlice({
    name: 'source',
    initialState: INITIAL_SOURCE,
    reducers: {
        reset: () => INITIAL_SOURCE
    },
    asyncReducers: {
        fetch: {
            payloadCreator: async () => {
                const features = await sourceRequest()
                return { features, receivedAt: Date.now() }
            },
            pending: (state) => {
                state.loading = LOADING.pending
            },
            fulfilled: (_, { payload: { features, receivedAt } }) => ({
                error: null,
                features,
                loading: LOADING.idle,
                receivedAt
            }),
            rejected: (state, { error }) => {
                state.loading = LOADING.error
                state.error = error
            }
        }
    }
})

const INITIAL_VIEWPORT = {
    clusters: [],
    points: []
}
const viewport = createSlice({
    name: 'viewport',
    initialState: INITIAL_VIEWPORT,
    reducers: {
        reset: () => INITIAL_VIEWPORT,
        set: (_, { points }) => ({
            clusters: [], // TODO
            points: transformGeoJsonFeaturesToMarkerProps(points)
        })
    }
})

const features = combineSlices({ selected, source, viewport })

export default features
