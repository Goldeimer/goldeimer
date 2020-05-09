import React from 'react'
import { useDispatch } from 'react-redux'

import { proximityMarker_set } from 'actions/merchantMapActions'
import usePrevious from 'hooks/usePrevious'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'

import GeocodingAutocomplete from
    'components/GeocodingAutocomplete/GeocodingAutocomplete'
import StandardDialog from 'components/StandardDialog/StandardDialog'

const ProximityMarkerSelectDialog = (props) => {
    const dispatch = useDispatch()
    const proximityMarker = useShallowEqualSelector(
        (state) => (state.proximityMarker)
    )
    const previousProximityMarker = usePrevious(proximityMarker)

    return (
        <StandardDialog
            shouldBeOpen={previousProximityMarker === undefined}
            {...props}
        >
            <GeocodingAutocomplete
                onSelect={
                    (selectedItem) => {
                        dispatch(
                            proximityMarker_set(selectedItem)
                        )
                    }
                }
            />
        </StandardDialog>
    )
}

export default ProximityMarkerSelectDialog
