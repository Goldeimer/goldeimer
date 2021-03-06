import { $enum } from 'ts-enum-util'

import type {
    EnumInstance
} from '../types'

const DefaultKey = "UnknownValue"

export const getKey = <
    EnumType
>(
    enumObj: EnumInstance<EnumType>,
    value?: number | null,
    defaultKey: string = DefaultKey
): string => (
    $enum(enumObj).getKeyOrDefault(value, defaultKey)
)