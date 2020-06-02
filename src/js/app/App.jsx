import React from 'react'

import { getTheme } from '@config/theme'
import makeStore from '@lib/redux/store'

import AppRoot from '@lib/components/root/AppRoot'
import MapRoot from '@map/MapRoot'

import { ROOT_REDUCER } from '@app/app'

const store = makeStore(ROOT_REDUCER)
const theme = getTheme()

const App = () => (
    <AppRoot
        favicon={theme.favicon}
        store={store}
        theme={theme.mui}
        title='Händlerkarte'
    >
        <MapRoot />
    </AppRoot>
)

export default App