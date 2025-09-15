/*
 [y] hybris Platform
 Copyright (c) 2017 SAP SE or an SAP affiliate company.
 All rights reserved.
 This software is the confidential and proprietary information of SAP
 ("Confidential Information"). You shall not disclose such Confidential
 Information and shall use it only in accordance with the terms of the
 license agreement you entered into with SAP.
 */
ACC.iamActions = (function () {
    function calculateTimeout(fastRetry = 0) {
        if (fastRetry < ACC.config.iamFastRetryNumber) {
            return ACC.config.iamFastRetryInterval;
        }

        return ACC.config.iamDefaultRetryInterval;
    }

    function executeOnSessionStates(
        func,
        states,
        numberOfRetries = 200,
        maxTotalTimeToWait = ACC.config.iamMaxRetryTotalWaitTime,
        fastRetry = 0,
    ) {
        const timeout = calculateTimeout(fastRetry + 1);

        if (!ACC.piSessionInitializer.isInitialized()) {
            return;
        }

        const currentState = piSession.hasValidSession(1);
        if (states.indexOf(currentState) === -1) {
            if (numberOfRetries <= 0 || maxTotalTimeToWait <= 0) {
                throw new Error(`IES session state is ${currentState} after all retries, it is not in ${states}`);
            }

            setTimeout(
                executeOnSessionStates,
                timeout,
                func,
                states,
                numberOfRetries - 1,
                maxTotalTimeToWait - timeout,
                fastRetry + 1,
            );
        } else {
            func();
        }
    }

    function executeFuncOnStatesNotFound(
        func,
        states,
        numberOfRetries = 200,
        maxTotalTimeToWait = ACC.config.iamMaxRetryTotalWaitTime,
        fastRetry = 0,
    ) {
        const timeout = calculateTimeout(fastRetry + 1);

        if (!ACC.piSessionInitializer.isInitialized()) {
            return;
        }

        const currentState = piSession.hasValidSession(1);
        if (states.indexOf(currentState) === -1) {
            if (numberOfRetries <= 0 || maxTotalTimeToWait <= 0) {
                func();
            } else {
                setTimeout(
                    executeFuncOnStatesNotFound,
                    timeout,
                    func,
                    states,
                    numberOfRetries - 1,
                    maxTotalTimeToWait - timeout,
                    fastRetry + 1,
                );
            }
        }
    }

    function executeOnSessionStatesWithErrorCallback(
        func,
        errorFunc,
        states,
        numberOfRetries = 200,
        maxTotalTimeToWait = ACC.config.iamMaxRetryTotalWaitTime,
        fastRetry = 0,
    ) {
        const timeout = calculateTimeout(fastRetry + 1);

        if (!ACC.piSessionInitializer.isInitialized()) {
            return;
        }

        const currentState = piSession.hasValidSession(1);
        if (states.indexOf(currentState) === -1) {
            if (numberOfRetries <= 0 || maxTotalTimeToWait <= 0) {
                console.error(`IES session state is ${currentState} after all retries, it is not in ${states}`);
                errorFunc();
            } else {
                setTimeout(
                    executeOnSessionStatesWithErrorCallback,
                    timeout,
                    func,
                    errorFunc,
                    states,
                    numberOfRetries - 1,
                    maxTotalTimeToWait - timeout,
                    fastRetry + 1,
                );
            }
        } else {
            func();
        }
    }

    function buildLoginSuccessUrl() {
        const currentUrl = window.location.href;
        return currentUrl.indexOf('?') !== -1 ? `${currentUrl}&login=true` : `${currentUrl}?login=true`;
    }

    function triggerDefaultIamLogin(originalReferer, successMessage, rememberMe) {
        piSession.login(buildLoginSuccessUrl(), 10, () => {
            ACC.iamActions.triggerHybrisLogin(originalReferer, successMessage, rememberMe);
        });
    }

    function triggerIamLoginThroughSessionInit(username, password, originalReferer, successMessage, rememberMe) {
        ACC.piSessionInitializer.initialize();
        piSession.on(piSession.SessionStateKnownEvent, () => {
            executeOnSessionStates(() => {
                ACC.iamActions.triggerHybrisLogin(originalReferer, successMessage, rememberMe);
            }, [piSession.Success]);
        });
    }

    function callWebCredentials(username, password) {
        return $.ajax({
            type: 'POST',
            url: `${ACC.config.iamBaseUrl}/login/webcredentials`,
            data: { username, password, client_id: ACC.config.iamClientId },
            xhrFields: {
                withCredentials: true,
            },
        });
    }

    function getDefaultLogoutUrl(sessionTimedOutFlag, autoLogoutFlag) {
        return `${window.location.origin
            + ACC.config.encodedContextPath
        }/logout?sessionTimedOut=${sessionTimedOutFlag}&autoLogoutFlag=${autoLogoutFlag}`;
    }

    function getLogoutUrl(sessionTimedOutFlag, autoLogoutFlag) {
        let logoutUrl = $('a[href$="/logout"]').attr('href');

        if (typeof logoutUrl === 'undefined' || (logoutUrl.indexOf('undefined') > -1)) {
            logoutUrl = getDefaultLogoutUrl(sessionTimedOutFlag, autoLogoutFlag);
        } else if (sessionTimedOutFlag) {
            logoutUrl += '?sessionTimedOut=true';
        } else if (autoLogoutFlag) {
            logoutUrl += '?autoLogoutFlag=true';
        }

        if (ACC.config && ACC.config.consoleHomePageUrl) {
            logoutUrl = `${logoutUrl}&consoleHomePageUrl=${ACC.config.consoleHomePageUrl}`;
        }

        return logoutUrl;
    }

    function logoutFromHybris(sessionTimedOutFlag, autoLogoutFlag) {
        window.location.href = encodeURI(getLogoutUrl(sessionTimedOutFlag, autoLogoutFlag));
    }

    function defaultLoginToHybris(originalReferer, successMessage, rememberMe) {
        piSession.getToken((status, token) => {
            $(document).ready(() => {
                $('#token').val(token);
                $('#userId').val(piSession.userId());
                if (rememberMe) {
                    $('#remember-me').val(true);
                }
                const storageReferer = localStorage ? localStorage.getItem('oldReferer') : '';
                const oldReferer = (storageReferer && storageReferer.indexOf('/login') > -1) ? '' : storageReferer;
                if (oldReferer) {
                    $('#originalReferer').val(oldReferer);
                    localStorage.setItem('oldReferer', '');
                } else if (originalReferer) {
                    $('#originalReferer').val(originalReferer);
                }
                if (successMessage) {
                    $('#successMessage').val(successMessage);
                }
                const customLoginUrl = $('#loginActionUrl').val();
                if (customLoginUrl) {
                    $('#loginForm').attr('action', customLoginUrl);
                }
                $('#loginForm').submit();
            });
        });
    }

    return {
        _autoload: [
            'autologin',
            'bindSessionTimeout',
            'removeInvalidSession',
        ],

        triggerHybrisLogoutIfNoSession() {
            piSession.on(piSession.SessionStateKnownEvent, () => {
                executeFuncOnStatesNotFound(() => {
                    logoutFromHybris(false, true);
                }, [piSession.Success], 20);
            });
        },

        triggerUpcConsentPageWithCallback(onDone) {
            if (ACC.upcConsents) {
                ACC.upcConsents.showUpcMarketingConsents(() => {
                    onDone();
                });
                return;
            }
            onDone();
        },

        triggerHybrisLogin(originalReferer, successMessage, rememberMe) {
            if (!piSession) {
                return;
            }
            if (ACC.customlogin && ACC.customlogin.doCustomLogin) {
                ACC.customlogin.doCustomLogin(originalReferer, successMessage, rememberMe, defaultLoginToHybris);
                return;
            }
            if (!ACC.config.iesComponentForLoginEnabled) {
                ACC.iamActions.triggerUpcConsentPageWithCallback(
                    () => { defaultLoginToHybris(originalReferer, successMessage, rememberMe); },
                );
            } else {
                defaultLoginToHybris(originalReferer, successMessage, rememberMe);
            }
        },

        triggerIamLogin(originalReferer, successMessage, rememberMe) {
            if (!piSession) {
                return;
            }

            triggerDefaultIamLogin(originalReferer, successMessage, rememberMe);
        },

        tryTriggerIamLogin(originalReferer, successMessage) {
            const result = $.Deferred();

            if (!piSession || ACC.config.isSsoEnabled !== 'true') {
                result.reject();
                return result.promise();
            }

            if (ACC.piSessionInitializer.isIamSessionJsV2Enabled) {
                ACC.piSessionInitializer.initialize();
                executeOnSessionStates(() => {
                    if (piSession.userId() != null) {
                        ACC.iamActions.triggerHybrisLogin(originalReferer, successMessage);
                    } else {
                        result.reject();
                    }
                }, [piSession.Success, piSession.NoSession]);
            } else if (piSession.userId() != null) {
                triggerDefaultIamLogin(originalReferer, successMessage);
            } else {
                result.reject();
            }

            return result.promise();
        },

        triggerIamLoginFromEmbeddedPage(
            username,
            password,
            rememberMe,
            originalReferer,
            successMessage,
            successCallback,
            errorCallback,
        ) {
            if (!piSession) {
                return;
            }

            callWebCredentials(username, password)
                .done(successCallback)
                .done(() => {
                    if (ACC.config.piSessionAvoidReInitEnabled) {
                        ACC.iamActions.removePiInitializationAttemptTimeStamp();
                        window.location.href = `${ACC.config.encodedContextPath}/auto-login?loginUrl=/login`;
                    }
                    if (ACC.piSessionInitializer.isIamSessionJsV2Enabled) {
                        triggerIamLoginThroughSessionInit(
                            username,
                            password,
                            originalReferer,
                            successMessage,
                            rememberMe,
                        );
                    } else {
                        executeOnSessionStates(() => {
                            triggerDefaultIamLogin(originalReferer, successMessage, rememberMe);
                        }, [piSession.Success, piSession.NoToken]);
                    }
                })
                .fail(errorCallback);
        },

        logSessionState() {
            console.log(`${piSession.hasValidSession(0)} ${piSession.userId()}`);

            executeOnSessionStates(
                ACC.iamActions.logoutOnlyForValidHybrisSession,
                [piSession.NoSession],
                10000000,
            );
        },

        logoutOnlyForValidHybrisSession() {
            $.ajax({
                type: 'GET',
                url: `${ACC.config.encodedContextPath}/customer/current/loginstatus`,
            }).always((data, textStatus, jqXHR) => {
                const hybrisSessionIsAlive = jqXHR.status !== undefined && jqXHR.status !== 401;
                if (hybrisSessionIsAlive) {
                    ACC.iamActions.logout(false);
                }
            });
        },

        removeInvalidSession() {
            const isValidCustomer = !$('#loginForm').data('isInvalidCustomer');
            if (!piSession || isValidCustomer) {
                return;
            }
            if (piSession.userId() == null) {
                setTimeout(() => { ACC.iamActions.removeInvalidSession(); }, 300);
            } else {
                piSession.logout(window.location.href);
            }
        },

        autologin() {
            if (!piSession) {
                return;
            }

            const hasToLogin = window.location.href.indexOf('login=true') !== -1;

            if (hasToLogin) {
                ACC.iamActions.triggerHybrisLogin();
            }
        },

        autoLoginPiSession() {
            if (!piSession) {
                return;
            }

            if (ACC.isInternalUser || (ACC.utils?.isMojoTheme()
                && ACC.header?.getAEMGlobalProperty('feature_pearsonplus-logout-logic-on') !== 'true')) {
                window.skipCommerceHeader = true;
            }

            ACC.piSessionInitializer.initialize();
            piSession.on(piSession.SessionStateKnownEvent, () => {
                let targetUrl = window.location.href;
                if (ACC.isInternalUser) {
                    targetUrl = ACC.internalUrl;
                }
                if (ACC.isAutoLoginPage) {
                    executeOnSessionStatesWithErrorCallback(
                        () => {
                            if (ACC.config.useSsoOnDifferentDomain) {
                                ACC.iamActions.prepareAutoLogin(piSession.userId());
                            }
                            ACC.iamActions.triggerHybrisLogin(targetUrl);
                        },
                        () => { window.location.href = ACC.forceLoginUrl; },
                        [piSession.Success],
                        20,
                    );
                } else {
                    executeOnSessionStates(() => {
                        if (ACC.config.useSsoOnDifferentDomain) {
                            ACC.iamActions.prepareAutoLogin(piSession.userId());
                        }
                        ACC.iamActions.triggerHybrisLogin(targetUrl);
                    }, [piSession.Success]);
                }
            });
        },

        autoLoginCmsPiSession() {
            if (!piSession) {
                return;
            }
            ACC.piSessionInitializer.initialize();
            piSession.on(piSession.SessionStateKnownEvent, () => {
                const sucCallback = function () {
                    ACC.iamActions.triggerHybrisLogin(window.location.href);
                };
                const errCallback = function () {
                    if (localStorage) {
                        localStorage.setItem('oldReferer', document.referrer);
                    }
                    window.location.href = encodeURI(window.location.href.split('?')[0]);
                };
                executeOnSessionStatesWithErrorCallback(sucCallback, errCallback, [piSession.Success], 10);
            });
        },

        logout(sessionTimedOutFlag) {
            ACC.iamActions.clearUserDataCheckAttr();
            ACC.iamActions.removeAuthenticationTokenCookie();

            piSession.logout(encodeURI(getLogoutUrl(sessionTimedOutFlag)));
        },

        internalLogout(sessionTimedOutFlag) {
            if (!piSession || !piSession.userId()) {
                $.ajax({
                    type: 'GET',
                    url: encodeURI(getLogoutUrl(sessionTimedOutFlag)),
                });
            } else {
                piSession.clearLocalStorage();
                piSession.logout(encodeURI(getLogoutUrl(sessionTimedOutFlag)));
            }
        },

        bindLogoutAction() {
            if (!piSession) {
                return;
            }

            $('a[href$="/logout"]').on('click', (e) => {
                e.preventDefault();
                if ($('#showLeaveRegistrationPopup').val() !== 'true') {
                    ACC.iamActions.logout(false);
                }
            });

            piSession.on(piSession.SessionTimedOutEvent, () => {
                ACC.iamActions.logout(true);
            });

            piSession.on(piSession.LogoutEvent, () => {
                // Prevent reloading of the active page on logout event (which is redundant)
                if (document.hidden) {
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000);
                }
            });
        },

        addZIndexToTimingModal() {
            const piSessionTimingOutModal = document.getElementById('piSessionTimingOutModal');

            if (piSessionTimingOutModal) {
                piSessionTimingOutModal.style.zIndex = 9999;
            } else {
                setTimeout(ACC.iamActions.addZIndexToTimingModal, 100);
            }
        },

        addZIndexToTimedOutModal() {
            const piSessionTimedOutModal = document.getElementById('piSessionTimedOutModal');

            if (piSessionTimedOutModal) {
                piSessionTimedOutModal.style.zIndex = 9999;
            } else {
                setTimeout(ACC.iamActions.addZIndexToTimedOutModal, 100);
            }
        },

        bindSessionTimeout() {
            if (!piSession) {
                return;
            }

            ACC.piSessionInitializer.addCallback(() => {
                ACC.iamActions.addZIndexToTimingModal();
                ACC.iamActions.addZIndexToTimedOutModal();
            });

            if (ACC.config.sessionTimedOut === 'true') {
                piSession.showSessionTimedOutModal();
                $('.piContinue').on('click', () => {
                    if (localStorage) {
                        localStorage.setItem('oldReferer', document.referrer);
                    }
                    window.location.reload();
                });
            }

            if (!ACC.piSessionInitializer.isInitialized()) {
                return;
            }
            piSession.on(piSession.SessionTimingOutEvent, () => {
                ACC.iamActions.addSignOutEvent();
            });
        },

        addSignOutEvent() {
            $('.piSignOut').on('click', () => {
                ACC.iamActions.logout(false);
            });
        },

        prepareAutoLogin(userId) {
            $.ajax({
                async: false,
                type: 'POST',
                url: `${ACC.config.encodedContextPath}/login/createPearsonCustomerByUserId`,
                data: { userId },
            });
        },

        clearUserDataCheckAttr() {
            let userDataCheckAttrName = 'userDataCheck';
            if (ACC.config && ACC.config.userDataCheckAttrName) {
                userDataCheckAttrName = ACC.config.userDataCheckAttrName;
            }
            localStorage.removeItem(userDataCheckAttrName);
        },

        removeAuthenticationTokenCookie() {
            let cookieName = 'X-Authorization';
            if (ACC.config && ACC.config.authenticationTokenCookieParameterName) {
                cookieName = ACC.config.authenticationTokenCookieParameterName;
            }
            document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        },

        removePiInitializationAttemptTimeStamp() {
            localStorage.removeItem(`${ACC.config.iamClientId}.PiInitializationAttemptTimeStamp`);
        },
    };
}());
