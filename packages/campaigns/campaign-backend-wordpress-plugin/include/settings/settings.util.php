<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.constants.php';

function getPeopleCount()
{
    return get_option(
        SETTING_PEOPLE_COUNTER_SLUG,
        SETTING_PEOPLE_COUNTER_DEFAULT_VALUE
    );
}

function setPeopleCount( $value )
{
    if (
        update_option(
            SETTING_PEOPLE_COUNTER_SLUG,
            $value
        )
    ) {
        return $value;
    }

    // minimalistic graceful error handling
    return 0;
}
