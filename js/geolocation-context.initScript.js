
var DMCP = DMCP || {};

(function($) {
    'use strict';

    /*
        Init the geolocation pop-ups by setting event handlers for anchor tag clicks.

        Based on the users geo-located state we will show different pop-ups to the end user.
    */
    DMCP.Geolocation.initPopups = function() {

        // Check to see If the user clicks on a global page link

        // Check to see if a configs contain a global version
        if (DMCP.Geolocation.getGlobalConfig()) {

            var globalConfig = DMCP.Geolocation.getGlobalConfig();

            if (!globalConfig) {
                return;
            }

            // Click event listener is for the modal pop ups
            $(document).on('click', 'a', function(e) {

                var clickedLinkUrl = $(this).attr('href');
                var openLinkInNewTab = "_blank" === $(this).attr('target');
                var clickEventIsStore = false;

                // Check to see if the link has a store type, if Empty, then the link does not apply to the store
                var storeType = DMCP.Geolocation.getStoreTypeForLink(clickedLinkUrl, globalConfig.stores);

                // Check that ths link is available
                if (storeType) {
                    e.preventDefault();

                    // If the user has NO location....
                    if (DMCP.Geolocation._config.userLocale === "NA") {
                        DMCP.Geolocation.createModal("selectYourStore", storeType, openLinkInNewTab);

                        return;
                    }

                    // If the user has chosen their location...
                    if (DMCP.Geolocation._config.localeIsChosen) {
                        DMCP.Geolocation.createModal("forwardUser", storeType, openLinkInNewTab);

                        return;
                    }

                    // as the default then the user has a location BUT has not chosen a location...

                    var localeStorePath = DMCP.Geolocation.getLinkForStoreTypeAndLocale(storeType, DMCP.Geolocation._config.userLocale);

                    // If there is no locale store for their chosen locale, then we display that we have no store
                    if (typeof localeStorePath === "undefined") {
                        DMCP.Geolocation.createSelectYouCountryModal(storeType, openLinkInNewTab);

                        return;
                    }

                    DMCP.Geolocation.Cookie.createCookie("geotargetchosenlocale", DMCP.Geolocation._config.userLocale, 30);
                    DMCP.Geolocation.updateLocale();

                    DMCP.Geolocation.navigate(localeStorePath, openLinkInNewTab);

                } else {
                    var userInteractionValidate = false;

                    // Find a store that has a link that matches the clicked link, and set the chosen locale of the
                    // user based on that interaction.
                    $.each(DMCP.Geolocation._config.storeLocaleConfig, function(i, localeConfig) {
                        if (userInteractionValidate) {
                            return false; // Exit the loop.
                        }

                        // Check if any corporate link matches the clicked link, and set the chosen locale of the
                        // user based on that interaction.
                        var localeCorporateLink = localeConfig.localeCorporateLink;

                        //endsWith method may not be available in all JavaScript implementations, so this workaround is introduced
                        if (localeCorporateLink !== undefined && clickedLinkUrl.substring(clickedLinkUrl.length - localeCorporateLink.length) === localeCorporateLink) {
                            DMCP.Geolocation.Cookie.createCookie("geotargetchosenlocale", localeConfig.localeCode, 30);

                            // Make sure that the state of the locale config is chosen.
                            DMCP.Geolocation.updateLocale();

                            userInteractionValidate = true;

                            return false; // Exit the loop.
                        }

                        $.each(localeConfig.stores, function(j, store) {
                            if (clickedLinkUrl.startsWith(store.storeUrl)) {

                                DMCP.Geolocation.Cookie.createCookie("geotargetchosenlocale", localeConfig.localeCode, 30);

                                // Make sure that the state of the locale config is chosen.
                                DMCP.Geolocation.updateLocale();

                                userInteractionValidate = true;

                                return false; // Exit the loop.
                            }
                        });
                    });
                }
            });
        }

    };

    // Init the script to get the user location via ajax call to AEM.
    DMCP.Geolocation.trackUserLocale();

    var pageInfo = dataLayer[0].pageInfo;
    if (!pageInfo.isAuthor && pageInfo.isBypassEnabled) {
        var storeConfig = DMCP.Geolocation.getStoreConfig(DMCP.Geolocation._config.userLocale);

        // bypassDestination properties are pulled from url mappings generic list
        if (storeConfig && storeConfig.bypassDestination) {
            DMCP.Geolocation.navigate(storeConfig.bypassDestination, false);
        }
    }
	
    // Create the click listeners.
    DMCP.Geolocation.initPopups();

})(jQuery);