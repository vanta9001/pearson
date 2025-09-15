"use strict";

var iesSessionInitialized = false;
var piSession = window.piSession;

(function() {

  try {
    var sessionId = getGlobalProperty('ies-client-id');
    if (piSession) {
      piSession.initialize(sessionId, {
        "useDefaultIdleTimoutWarningPopup": true,
        "loginSuccessUrl" : window.location.href
      });
      iesSessionInitialized = true;
    } else {
      console.warn("piSession is null, cannot initialize session.");
    }
  } catch (e) {
    console.error("Error during piSession initialization;", e);
    piSession = null;
  }

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
})();
