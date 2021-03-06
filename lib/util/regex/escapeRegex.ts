export const escapeRegex = (str: string): string => str.replace(
    /[-/\\^$*+?.()|[\]{}]/gu,
    '\\$&'
)