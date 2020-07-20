import { useSelector } from 'react-redux'

import getSourceFeatures, {
    getFeatureById,
    getFeaturesById,
    getSourceFeatureGeometriesByProximity,
    selectEnrichedViewFeatures,
    selectSourceReceivedAt,
    FEATURE_FORMAT
} from '@map/features/selectFeatures'

const useFeature = (id, format = FEATURE_FORMAT.geojson) => useSelector(
    getFeatureById(id, format)
)

const useFeatures = (ids = [], format = FEATURE_FORMAT.geojson) => useSelector(
    getFeaturesById(ids, format)
)

const useSourceRedeivedAt = () => useSelector(selectSourceReceivedAt)

const useSourceFeatures = (
    format = FEATURE_FORMAT.geojson,
    shouldFilter = true,
    shouldSort = false
) => useSelector(
    getSourceFeatures(format, shouldFilter, shouldSort)
)

const useSourceFeaturesByProximity = (
    latitude,
    longitude,
    options = {}
) => {
    const {
        format = FEATURE_FORMAT.detail,
        ...selectorOptions
    } = options

    const geometries = useSelector(
        getSourceFeatureGeometriesByProximity(
            latitude,
            longitude,
            selectorOptions
        )
    )

    const features = useFeatures(geometries.map(({ id }) => id), format)

    return features.map((feature) => ({
        ...geometries.find(({ id }) => id === feature.id),
        ...feature
    }))
}

const useViewFeatures = () => {
    const viewFeatures = useSelector(selectEnrichedViewFeatures)
    return viewFeatures
}

const useDetail = (id) => useFeature(id, FEATURE_FORMAT.detail)

export {
    useSourceFeatures as default,
    useDetail,
    useFeature,
    useFeatures,
    useSourceFeaturesByProximity,
    useSourceRedeivedAt,
    useViewFeatures
}
