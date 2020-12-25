import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Source as SourceGl } from 'react-map-gl'

import {
    getPrimaryTaxonomy,
    getSecondaryTaxonomy
} from '../../config/taxonomies'

const GEOJSON_SOURCE_ID = 'features'

const inProperty = (el, key) => ['in', el, ['get', `${key}`]]

const incrementIf = (condition) => ['+', ['case', condition, 1, 0]]

const makeClusterProperties = (
    primaryTaxonomy = getPrimaryTaxonomy(),
    secondaryTaxonomy = getSecondaryTaxonomy()
) => primaryTaxonomy.terms.reduce((acc, { termId }) => ({
    ...acc,
    [`${termId}`]: incrementIf(
        inProperty(termId, primaryTaxonomy.taxonomyId)
    ),
    ...secondaryTaxonomy.terms.reduce((acc2, { termId: termId2 }) => ({
        ...acc2,
        [`${termId2}`]: incrementIf(
            inProperty(termId2, secondaryTaxonomy.taxonomyId)
        ),
        [`${termId}:${termId2}`]: incrementIf(
            ['all',
                inProperty(termId, primaryTaxonomy.taxonomyId),
                inProperty(termId2, secondaryTaxonomy.taxonomyId)]
        )
    }), {})
}), {})

const Source = ({
    children,
    featureCollection
}, ref) => {
    if (!featureCollection) {
        return null
    }

    return (
        <SourceGl
            attribution=""
            // `mapbox-gl-js` default value: 128
            buffer={64}
            cluster
            clusterMaxZoom={14}
            clusterProperties={makeClusterProperties()}
            clusterRadius={128}
            data={featureCollection}
            id={GEOJSON_SOURCE_ID}
            maxzoom={17}
            promoteId="id"
            ref={ref}
            // `mapbox-gl-js` default value: 0.375
            tolerance={0.375}
            type="geojson"
        >
            {children}
        </SourceGl>
    )
}

Source.propTypes = {
    children: PropTypes.node,
    featureCollection: PropTypes.exact({
        // TODO(Johannes):
        // Improve. (Neither important nor overly bad - just "feels" messy.)
        /* eslint-disable react/no-unused-prop-types */
        type: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            /* eslint-disable react/forbid-prop-types */
            geometry: PropTypes.object,
            properties: PropTypes.object
            /* eslint-enable react/forbid-prop-types */
        }))
        /* eslint-enable react/no-unused-prop-types */
    })
}

Source.defaultProps = {
    children: null,
    featureCollection: null
}

export default forwardRef(Source)