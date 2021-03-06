import React, { useEffect, useState } from 'react'
// TODO: Deprecate styled-components
import styled from 'styled-components'

import { ThemeProvider } from '@material-ui/core/styles'

import { MuiThemeGoldeimer } from '@goldeimer/mui-theme'

import {
    InputIntegerPlusMinus,
    InputSelect,
    LegacyFormField,
    LegacyFormSection
} from '@goldeimer/react-components'

import ToiletPaperCalculatorResult from '../ToiletPaperCalculatorResult'

import {
    DAYS_PER_MONTH,
    PIECES_PER_ROLL,
    ROLLS_PER_PACKAGE,
    SUBSCRIPTION_PERIODS_IN_MONTHS,
    SUBSCRIPTION_SIZES_IN_PACKAGES
} from '../../toilet-paper-calculator-config'

const makeSubscriptionPerPeriodCopy = (months) => {
    if (months === 1) {
        return 'jeden Monat'
    }

    return `alle ${months} Monate`
}

const makeSubscriptionUrl = (months, packages) => {
    const prefix = 'https://goldeimer.de/jtl/Dein-persoenliches-Goldeimer-ABO'

    const makeSubscriptionUrlSuffix = (urlMonths) => (
        makeSubscriptionPerPeriodCopy(urlMonths).replace(/\s/g, '-')
    )

    return `${prefix}-${packages}-Packungen-${makeSubscriptionUrlSuffix(months)}`
}

const makeNormalizedSubscriptionArray = () => {
    const normalizedSubscriptionArray = SUBSCRIPTION_PERIODS_IN_MONTHS.map(
        (months) => (
            SUBSCRIPTION_SIZES_IN_PACKAGES.map(
                (packages) => {
                    const rollsPerMonth = packages * ROLLS_PER_PACKAGE / months

                    return {
                        months,
                        packages,
                        perPeriodCopy: makeSubscriptionPerPeriodCopy(months),
                        rollsPerMonth,
                        url: makeSubscriptionUrl(months, packages)
                    }
                }
            )
        )
    ).flat()

    normalizedSubscriptionArray.sort(
        (subA, subB) => {
            if (subA.rollsPerMonth < subB.rollsPerMonth) return -1
            if (subA.rollsPerMonth > subB.rollsPerMonth) return 1

            if (subA.months < subB.months) return -1
            if (subA.months > subB.months) return 1

            return 0
        }
    )

    return normalizedSubscriptionArray
}

const findBestFittingSubscription = (
    subscriptions,
    requiredRollsPerMonth,
    selectedMonths
) => {
    let bestFit = null

    /* eslint-disable-next-line no-restricted-syntax */
    for (const subscription of subscriptions) {
        if (subscription.rollsPerMonth > requiredRollsPerMonth) {
            if (
                !bestFit
                || (
                    bestFit.months < selectedMonths
                    && subscription.rollsPerMonth <= bestFit.rollsPerMonth
                )
            ) {
                bestFit = subscription
            } else {
                return bestFit
            }
        }
    }

    return subscriptions.slice(-1)[0]
}

const Form = /*@__PURE__*/ styled.form`
    margin: 0 auto;
    width: 100%;
    color: #444;
    font-weight: bold;
`

const ToiletPaperCalculator = () => {
    // user input
    const [form, setFormValues] = useState({
        dailyPissCount: 0,
        dailyShitCount: 0,
        periodInMonths: 1,
        personsInHousehold: 0,
        piecesPerPiss: 0,
        piecesPerWipe: 0,
        wipesPerShit: 0
    })

    const normalizedSubscriptionArray = makeNormalizedSubscriptionArray()

    const [
        /* eslint-disable-next-line no-unused-vars */
        requiredRollsPerMonth,
        setRequiredRollsPerMonth
    ] = useState(0)
    const [
        requiredRollsPerSelectedPeriod,
        setRequiredRollsPerSelectedPeriod
    ] = useState(0)
    const [
        bestFittingSubscription,
        setBestFittingSubscription
    ] = useState(normalizedSubscriptionArray[0])

    const {
        dailyPissCount,
        dailyShitCount,
        periodInMonths,
        personsInHousehold,
        piecesPerPiss,
        piecesPerWipe,
        wipesPerShit
    } = form

    const setValue = (key, value) => {
        setFormValues({
            ...form,
            [key]: value
        })
    }

    useEffect(
        () => {
            const calculateRequiredRollsPerMonth = () => {
                const piecesPerPersonPerDay = (
                    dailyShitCount * wipesPerShit * piecesPerWipe
                    + dailyPissCount * piecesPerPiss
                )

                return Math.ceil(
                    piecesPerPersonPerDay * DAYS_PER_MONTH / PIECES_PER_ROLL
                )
            }

            const nextRequiredRollsPerMonth = calculateRequiredRollsPerMonth()

            setRequiredRollsPerMonth(nextRequiredRollsPerMonth)
            setRequiredRollsPerSelectedPeriod(
                nextRequiredRollsPerMonth * periodInMonths
            )
            setBestFittingSubscription(
                findBestFittingSubscription(
                    normalizedSubscriptionArray,
                    nextRequiredRollsPerMonth,
                    periodInMonths
                )
            )
        }, [
            form,
            dailyPissCount,
            dailyShitCount,
            piecesPerPiss,
            piecesPerWipe,
            wipesPerShit,
            normalizedSubscriptionArray,
            periodInMonths
        ]
    )

    return (
        <ThemeProvider theme={MuiThemeGoldeimer}>
            <Form formName="shitcalcForm">
                <LegacyFormSection
                    title="Haushalt"
                >
                    <LegacyFormField label="Personen im Haushalt">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('personsInHousehold', value)
                            }
                            value={personsInHousehold}
                        />
                    </LegacyFormField>
                </LegacyFormSection>
                <LegacyFormSection
                    title="Großes Geschäft"
                >
                    <LegacyFormField label="Große Geschäfte am Tag pro Person">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('dailyShitCount', value)
                            }
                            value={dailyShitCount}
                        />
                    </LegacyFormField>
                    <LegacyFormField label="Abwischer pro Geschäft">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('wipesPerShit', value)
                            }
                            value={wipesPerShit}
                        />
                    </LegacyFormField>
                    <LegacyFormField label="Blatt pro Abwischer">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('piecesPerWipe', value)
                            }
                            value={piecesPerWipe}
                        />
                    </LegacyFormField>
                </LegacyFormSection>
                <LegacyFormSection
                    title="Kleines Geschäft"
                >
                    <LegacyFormField label="Kleine Geschäfte am Tag pro Person">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('dailyPissCount', value)
                            }
                            value={dailyPissCount}
                        />
                    </LegacyFormField>
                    <LegacyFormField label="Blatt pro Geschäft">
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('piecesPerPiss', value)
                            }
                            value={piecesPerPiss}
                        />
                    </LegacyFormField>
                </LegacyFormSection>
                <LegacyFormSection
                    title="Zeitraum"
                >
                    <LegacyFormField label={
                        'Für welchen Zeitraum möchtest Du deinen '.concat(
                            'Klopapier Verbrauch planen?'
                        )
                    }
                    >
                        <InputSelect
                            options={
                                [
                                    { label: 'Ein Monat', value: 1 },
                                    { label: 'Zwei Monate', value: 2 },
                                    { label: 'Ein Viertel Jahr', value: 3 },
                                    { label: 'Ein halbes Jahr', value: 6 },
                                    { label: 'Ein Jahr', value: 12 }
                                ]
                            }
                            setValue={
                                (value) => setValue('periodInMonths', value)
                            }
                            value={periodInMonths}
                        />
                    </LegacyFormField>
                </LegacyFormSection>
            </Form>
            <ToiletPaperCalculatorResult
                bestFittingSubscription={bestFittingSubscription}
                requiredRollsPerSelectedPeriod={requiredRollsPerSelectedPeriod}
            />
        </ThemeProvider>
    )
}

export default ToiletPaperCalculator
