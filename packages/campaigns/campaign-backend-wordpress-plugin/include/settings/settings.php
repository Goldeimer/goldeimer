<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.util.php';

/// ----- content --------------------------------------------------------------

function settingsPage()
{
    ?>
    <div class="wrap">
        <h2>Abenteuer Regenwald Campaign</h2>
        <form method="post" action="options.php">
        <?php
            settings_fields( SETTINGS_GROUP );
            do_settings_sections( SETTINGS_PAGE_SLUG );
            submit_button();
        ?>
        </form>
    </div>
    <?php
}

// void
function settingsSection()
{}

function settingsFieldPeopleCounter()
{
    $currentValue = getPeopleCount();

    echo '<input type="text" name="'
        . SETTING_PEOPLE_COUNTER_SLUG
        . '" value="'
        . isset( $currentValue )
            ? esc_attr( $currentValue )
            : SETTING_PEOPLE_COUNTER_DEFAULT_VALUE
        . '">';
}

/// ----- (hooked) callbacks ---------------------------------------------------

function adminMenuInit()
{
    add_options_page(
        'Abenteuer Regenwald',
        'Abenteuer Regenwald',
        'manage_options',
        SETTING_PEOPLE_COUNTER_SLUG,
        'settingsPage'
    );
}

function settingsInit()
{
    register_setting(
        SETTINGS_GROUP,
        SETTING_PEOPLE_COUNTER_SLUG,
        array(
            'type' => 'number',
            'sanitize_callback' => 'absint',
            'default' => 0,
            'show_in_rest' => true
        )
    );

    add_settings_section(
        SETTINGS_SECTION_ID,
        'Admin Setttings',
        'settingsSection',
        SETTINGS_PAGE_SLUG
    );

    add_settings_field(
        SETTING_PEOPLE_COUNTER_SLUG,
        'People Counter',
        'settingsFieldPeopleCounter',
        SETTINGS_PAGE_SLUG,
        SETTINGS_SECTION_ID
    );
}

/// ----- hooking into WordPress -----------------------------------------------

if ( is_admin() ) {
    add_action(
        'admin_menu',
        'adminMenuInit'
    );

    add_action(
        'admin_init',
        'settingsInit'
    );
}
