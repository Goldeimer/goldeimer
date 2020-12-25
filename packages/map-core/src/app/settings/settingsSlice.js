import {
    combineSlices,
    createSlice,
    persistReducer
} from '@goldeimer/redux-util'

import defaultTheme from '../../config/theme'

import makeLocation from '../map/util/location'

const INITIAL_THEME = defaultTheme.id
const theme = createSlice({
    name: 'theme',
    initialState: INITIAL_THEME,
    reducers: {
        reset: () => INITIAL_THEME,
        set: (state, { theme: nextTheme }) => nextTheme
    }
})

const INITIAL_HOME = null
const home = createSlice({
    name: 'home',
    initialState: INITIAL_HOME,
    reducers: {
        reset: () => INITIAL_HOME,
        set: (state, {
            latitude,
            longitude,
            placeName = ''
        }) => makeLocation({
            latitude,
            longitude,
            placeName: `Zuhause${placeName.length > 0 ? ': ' : ''}${placeName}`
        })
    }
})

const settings = combineSlices({
    app: combineSlices({ theme }),
    user: combineSlices({ home })
})

settings.reducer = persistReducer(settings.reducer, { key: 'settings' })

const SETTINGS = settings.actions

export {
    SETTINGS as default,
    settings
}