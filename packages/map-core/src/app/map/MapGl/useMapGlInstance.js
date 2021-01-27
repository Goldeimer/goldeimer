import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { noop } from '@goldeimer/js-util/'
import {
    useCallback,
    useDebounce
} from '@goldeimer/react-util'

import FEATURE from '../feature'
import makeLayers from '../layers/makeLayers'

const querySourceFeatures = (mapGl, sourceId, dispatchFeatures) => {
    if (!mapGl) {
        return
    }

    const features = mapGl.querySourceFeatures(sourceId)

    if (features) {
        dispatchFeatures(features)
    }
}

const attachEventHandler = (eventIds, handler, target, handlerCache) => {
    eventIds.forEach((eventId) => {
        target.on(eventId, handler)
        handlerCache.push([eventId, handler])
    })
}

const detachEventHandlers = (target, handlerCache) => {
    handlerCache.forEach(([eventId, handler]) => (
        target.off(eventId, handler)
    ))
}

const DEBOUNCED_UPDATE_TRIGGER = ['sourcedata']
const IMMEDIATE_UPDATE_TRIGGER = ['idle']

const layers = makeLayers()

const useMapGlInstance = ({
    mapRef,
    sourceId = 'features'
}) => {
    const mapGlInstanceRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        if (mapRef.current) {
            mapGlInstanceRef.current = mapRef.current.getMap()
        }
    }, [mapRef])

    const queryFeatures = useCallback(() => querySourceFeatures(
        mapGlInstanceRef.current,
        sourceId,
        (features) => dispatch(FEATURE.view.set(features))
    ), [dispatch, sourceId])

    const [debouncedQueryFeatures] = useDebounce(
        queryFeatures, 200, false, 500
    )

    useEffect(() => {
        if (mapGlInstanceRef.current) {
            const handlerCache = []

            attachEventHandler(
                DEBOUNCED_UPDATE_TRIGGER,
                debouncedQueryFeatures,
                mapGlInstanceRef.current,
                handlerCache
            )
            attachEventHandler(
                IMMEDIATE_UPDATE_TRIGGER,
                queryFeatures,
                mapGlInstanceRef.current,
                handlerCache
            )

            return () => {
                detachEventHandlers(mapGlInstanceRef.current, handlerCache)
            }
        }

        return noop
    }, [sourceId, queryFeatures, debouncedQueryFeatures])

    return {
        layers,
        queryFeatures
    }
}

export default useMapGlInstance