import ORDER from '@lib/enum/order'
import { sortObjects } from '@lib/util/array'

const sortFeatures = (
    features,
    { orderBy = 'placeName', order = ORDER.asc }
) => sortObjects(
    features,
    orderBy,
    order,
    'properties'
)

export {
    sortFeatures as default,
    ORDER
}