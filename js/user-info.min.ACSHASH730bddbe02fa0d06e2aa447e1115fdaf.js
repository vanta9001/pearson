"use strict";

const userInfo = {};
const isEventScopeAnalyticsEnabled = getGlobalProperty('new2025AnalyticsEnabled', 'false');

(function () {

    var localeToSite = {
        ca: 'learnerca',
        gb: 'learneruk',
    };

    var isSubscriptionsSet = false;
    document.addEventListener('userDataReceived', userLoggedInEventHandler);

    if (isEventScopeAnalyticsEnabled === 'false') {
        $(window).on('load', fillUserInformation);
    } else {
        document.addEventListener('signInButtonCreated', fillUserInformation);
    }

    function fillUserInformation() {
        addUserInfoFromIEStoDataLayer();
        updateIesInformation();
    }

    function fillDataLayerWithScopeDataUserInfo(event) {
        if (isEventScopeAnalyticsEnabled === 'true') {
            dataLayer.push({
                'event': 'scopeData',
                'dataType': 'userInfo',
                userInfo
            });
        }
    }

    var setUserInfoProperty = function(key, value) {
        for ( var index in window.dataLayer) {
            if (dataLayer[index]['userInfo'] && dataLayer[index]['userInfo'][key] != undefined) {
                dataLayer[index]['userInfo'][key] = value
                return;
            }
        }
        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    [key]: value
                }
            });
        } else {
            Object.assign(userInfo, {
                [key]: value
            });
        }
    };

    async function updateIesInformation(event) {
        var token = await getToken();

        if (!token && !event) {
            document.dispatchEvent(new CustomEvent('userNotAuthenticated'));
            fillDataLayerWithScopeDataUserInfo();
            return;
        }

        if (!isSubscriptionsSet) {
            setSubscriptions(token);
            isSubscriptionsSet = true;
        }

        if (event) {
            var isFound = isUserCredentialsFound(event.detail.userData.role, event.detail.userData.email);

            if (!isFound) {
                addUserCredentialsToDataLayer(event.detail.userData.role, event.detail.userData.email)
            }

            document.dispatchEvent(new CustomEvent('userInfoReceived'));
            fillDataLayerWithScopeDataUserInfo();
            return;
        }

        if (!hasMyAccountMenuComponent()) {
            setUserDetails(token);
            document.dispatchEvent(new CustomEvent('userInfoReceived'));
            fillDataLayerWithScopeDataUserInfo();
            return;
        }
    }

    function hasMyAccountMenuComponent() {
        return typeof HEPMC != 'undefined' && Array.isArray(HEPMC.instances) &&
        HEPMC.instances.find(i => i.type === 'MyAccountMenuComponent') != undefined;
    }

    function setSubscriptions(token) {
        var subscriptionEntitlements = getSubscriptionEntitlements(token);
        setUserInfoProperty('mojoSubscriptionId', subscriptionEntitlements.subscriptionId);
        setUserInfoProperty('mojoSubscriptionTier', subscriptionEntitlements.entitlementLevel);
        setUserInfoProperty('mojoSubscriptionTitles_PIID', subscriptionEntitlements.entitlementData);
        setUserInfoProperty('mojoSubscriptionStatus', subscriptionEntitlements.subscriptionStatus);
    }

    function isUserCredentialsFound(role, email) {
        return dataLayer.some(item => {
                if (item.userInfo && item.userInfo.email && item.userInfo.visitorRole) {
                    return true;
                }
            });
    }

    function addUserCredentialsToDataLayer(role, email) {
        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    'visitorRole': role,
                    'email': email
                }
            });
        } else {
            Object.assign(userInfo, {
              'visitorRole': role.toLowerCase(),
              'email': email
            });
        }
    }

    function userLoggedInEventHandler(event) {
    	var defaultB2BUnitDataId = document.getElementById('defaultB2BUnitDataId');
    	var context = defaultB2BUnitDataId && defaultB2BUnitDataId.getAttribute('data-my-unit-type') === 'ORGANIZATION'
    	    ? 'organization' : 'individual';
        var userDetails = event.detail.userData;
        if (isEventScopeAnalyticsEnabled === 'false') {
            setUserInfoProperty('visitorId', piSession.userId());
            setUserInfoProperty('visitorType', 'Logged in');
        } else {
            setUserInfoProperty('iesUserId', piSession.userId());
            setUserInfoProperty('visitorType', 'logged in');
        }
        setUserInfoProperty('iesSessionID', piSession.getContextId());
        setUserInfoProperty('internalCustomer', ('INTERNAL' == userDetails.userType) ? 'Yes' : 'No');
        setUserInfoProperty('context', context);

        updateIesInformation(event);
    }

    function getToken() {
        return new Promise(function(resolve) {
            if (!window.piSession || !window.piSession.userId()) {
                resolve();

                return;
            }

            window.piSession.getToken(function(status, rToken) {
                if (status === window.piSession.Success) {
                    resolve(rToken);

                    return;
                }

                resolve();
            });
        });
    }

    function getLocale() {
        var pathname = window.location.pathname;
        var localeMatch = pathname.match(/^\/en-([a-zA-Z-]{2,2})[/.]/);
        var localeFromURL = localeMatch && localeMatch[1].toLowerCase();

        var cookieLocale = $.cookie('geotargetchosenlocale');

        return (localeFromURL || cookieLocale || '').toLowerCase();
    }

    function setUserDetails(iesToken) {
        var url = '/sling/servlet/default.getUserInfo.json';
        var locale = localeToSite[getLocale()] || 'learner';
        if (window.piSession && window.piSession.userId()) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                async: false,
                headers: {
                    'userId': piSession.userId(),
                    'X-Authorization': iesToken,
                    'locale': locale
                },
                success: function (userDetails) {
                    if (isEventScopeAnalyticsEnabled === 'false') {
                        dataLayer.push({
                            'userInfo': {
                                'visitorRole': userDetails.role,
                                'email': userDetails.email
                            }
                        });
                    } else {
                        Object.assign(userInfo, {
                            'visitorRole': userDetails.role?.toLowerCase(),
                            'email': userDetails.email
                        });
                    }
                    var userInfoEvent = new CustomEvent('userInfoReceived');
                    document.dispatchEvent(userInfoEvent);
                },
                error: function () {
                    console.log('Unable to get user data.');
                }
            });
        }
    }

    function getSubscriptionEntitlements(iesToken) {
        var url = '/sling/servlet/default.getSubscriptionEntitlements.json',
            subscriptionEntitlements = {
                entitlementLevel: '',
                entitlementData: [],
                subscriptionId: getActiveSubscriptionId(iesToken),
                subscriptionStatus: ''
            },
            subscriptionEntitlementsResponse;

        if (window.piSession && window.piSession.userId() && subscriptionEntitlements.subscriptionId !== '') {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                async: false,
                headers: {
                    'userId': piSession.userId(),
                    'X-Authorization': iesToken,
                    'subscriptionId': subscriptionEntitlements.subscriptionId
                },
                success: function (entitlements) {
                    subscriptionEntitlementsResponse = entitlements;
                    if (entitlements !== null) {
                        subscriptionEntitlements.entitlementLevel = entitlements.entitlementLevel
                        subscriptionEntitlements.entitlementData = entitlements.entitlementData;
                        subscriptionEntitlements.subscriptionId = entitlements.subscriptionId;
                        subscriptionEntitlements.subscriptionStatus = entitlements.status;
                    }
                },
                error: function () {
                    console.log('Unable to get subscription entitlements.');
                }
            });
        }
        var subscriptionEntitlementsEvent = new CustomEvent('subscriptionEntitlements', {detail: { subscriptionEntitlementsResponse }});
        document.dispatchEvent(subscriptionEntitlementsEvent);
        return subscriptionEntitlements;
    }

    function getActiveSubscriptionId(iesToken) {
        if (!window.piSession  || !window.piSession.userId()) {
            return '';
        }

        var url = '/sling/servlet/default.getSubscriptions.json',
            subscriptionId = '',
            subscriptionsResponse,
            allowedSubscriptionLevel = ['SINGLE', 'MULTI'];
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            async: false,
            headers: {
                'userId': piSession.userId(),
                'X-Authorization': iesToken
            },

            success: function (subscriptions) {
                subscriptionsResponse = subscriptions;
                if (subscriptions) {
                    subscriptions.forEach(function (subscription) {
                        var isAllowedSubscriptionLevel = allowedSubscriptionLevel.includes(subscription.entitlementLevel);
                        if (subscription.status === 'ACTIVE' && isAllowedSubscriptionLevel) {
                            subscriptionId = subscription.subscriptionId;
                        }
                    });
                }
            },
            error: function () {
                console.log('Unable to get user subscription id.');
            }
        });
        var subscriptionResponseEvent = new CustomEvent('subscriptionResponseReceived', {detail: { subscriptionsResponse }});
        document.dispatchEvent(subscriptionResponseEvent);
        return subscriptionId;
    }
})();

function getGlobalProperty(key, defaultValue) {
    if (globalProperties) {
        for (var itemKey in globalProperties.globalProperties) {
            if(globalProperties.globalProperties[itemKey][key]) {
                return globalProperties.globalProperties[itemKey][key];
            }
        }
        return defaultValue;
    } else {
        return defaultValue;
    }
}

function addUserInfoFromIEStoDataLayer() {
	var dataLayer = window.dataLayer || [];
	var isGlobalStore = globalProperties.siteId.startsWith('global-store-en');

	var element = document.getElementsByClassName('logged_in');
	var isUserSignedIn = document.querySelector('.userNav.userSignedIn');
	var isLoggedIn = element.length > 0 || isUserSignedIn != null;
	var defaultB2BUnitDataId = document.getElementById('defaultB2BUnitDataId');
	var context = defaultB2BUnitDataId && defaultB2BUnitDataId.getAttribute('data-my-unit-type') === 'ORGANIZATION' ?  'organization' : 'individual';
	var visitorId = '';

    if (isGlobalStore && (window.piSession && window.piSession.userId())) {
        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    'visitorType': 'Logged in',
                    'context': context
                }
            });
        } else {
            Object.assign(userInfo, {
                'visitorType': 'logged in',
                'context': context
            });
        }
    } else if (!isGlobalStore && isLoggedIn) {
		visitorId = element.length > 0 ? element[0].getAttribute('data-user-id') : '';

        // Push new information into dataLayer. GTM manages flattening of the output.
        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    'visitorType': 'Logged in',
                    'visitorId': visitorId,
                    'context': context
                }
            });
        } else {
            Object.assign(userInfo, {
                'visitorType': 'logged in',
                'visitorId': visitorId,
                'context': context
            });
        }
	} else {
		visitorId = 'Anonymous';
        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    'visitorType': visitorId,
                    'context': 'individual',
                    'mojoSubscriptionId': '',
                    'mojoSubscriptionTier': '',
                    'mojoSubscriptionTitles_PIID': []
                }
            });
        } else {
            Object.assign(userInfo, {
                'visitorType': 'anonymous',
                'mojoSubscriptionId': '',
                'mojoSubscriptionTier': '',
                'mojoSubscriptionTitles_PIID': []
            });
        }
	}

	if (window.CQ || !window.piSession || !window.piSession.userId()) {
        if (isEventScopeAnalyticsEnabled === 'false') {
            setIesSessionID('');
        }
		return;
	}

	// Call piSession only if visitorId is empty or iesSessionID is enabled
	if (visitorId === '' || getGlobalProperty('ies-sessionid-enabled', 'false') === 'true') {
		callPiSession(
			getGlobalProperty('ies-sessionid-max-attempts', 10),
			getGlobalProperty('ies-sessionid-timeout', 1000),
			function() {
				var dataLayer = window.dataLayer || [];

                if (isEventScopeAnalyticsEnabled === 'false') {
                    dataLayer.push({
                        'userInfo': {
                            'visitorId': piSession.userId()
                        }
                    });
                } else {
                    Object.assign(userInfo, {
                        'visitorId': piSession.userId()
                    });
                }

				setIesSessionID(piSession.getContextId());
			},
			function() {
				console.log('callPiSession failed');
				if (isEventScopeAnalyticsEnabled === 'false') {
				    setIesSessionID('');
				}
			}
		);
	} else {
		console.log('ies-sessionid-enabled: ' + getGlobalProperty('ies-sessionid-enabled', 'false'));
	}

    function setIesSessionID(iesSessionID) {
        var dataLayer = window.dataLayer || [];

        if (isEventScopeAnalyticsEnabled === 'false') {
            dataLayer.push({
                'userInfo': {
                    'iesSessionID': iesSessionID
                }
            });
        } else {
            Object.assign(userInfo, {
                'iesSessionID': iesSessionID
            });
        }
    }

    function callPiSession(maxAttempts, timeoutValue, onSuccess, onFail) {
        if (window.piSession.Unknown === window.piSession.hasValidSession(0)) {
            if (maxAttempts > 0) {
                setTimeout(callPiSession, timeoutValue, maxAttempts - 1, timeoutValue, onSuccess, onFail);
            } else {
                onFail();
            }
        } else {
            onSuccess();
        }
    }
}