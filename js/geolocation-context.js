

// Geolocation config and state
var DMCP = DMCP || {};

(function($) {
    'use strict';

    DMCP.Geolocation = DMCP.Geolocation || {};

    DMCP.Geolocation._config = {
        userLocale: "NA",
        currentPageIsGlobal: false,
        currentPageLocale: "NA",
        localeIsChosen: false,
        servletPath: "/etc/cloudservices/geolocation/global-store/jcr:content.geolocation-check.json",
        geoCookieDomain: ".pearson.com",
        storeLocaleConfig: [ {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/learner",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/educator",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/assessments",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "Global",
  "localeDisplayName" : "Global",
  "localeCorporateLink" : "Global"
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearson.com.ar/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.com.ar/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.com.ar/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "AR",
  "localeDisplayName" : "Argentina",
  "localeCorporateLink" : "http://www.pearson.com.ar/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Argentina)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://pearson.com.au/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://pearson.com.au/",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.com.au/locale-au.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.talentlens.com.au/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "AU",
  "localeDisplayName" : "Australia",
  "localeCorporateLink" : "http://www.pearson.com.au",
  "languageCode" : "en",
  "languageDisplayName" : "English (Australia)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/be/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/be/en_BE/higher-education.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/be/",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "BE",
  "localeDisplayName" : "Belgium",
  "localeCorporateLink" : "https://www.pearson.com/be/en_BE.html",
  "languageCode" : "en",
  "languageDisplayName" : "English (Belgium)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://loja.pearson.com.br/cursos-pedagogicos-pearson/formacao",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://loja.pearson.com.br/cursos-pedagogicos-pearson/formacao",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearsonclinical.com.br/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "BR",
  "localeDisplayName" : "Brazil",
  "localeCorporateLink" : "https://br.pearson.com/",
  "languageCode" : "pt",
  "languageDisplayName" : "Portuguese (Brazil)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/en-ca.html",
    "storeName" : "Student",
    "isInternalLink" : true
  }, {
    "storeUrl" : "https://www.pearson.com/ca/en.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.ca/en.locale-ca.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.ca/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "CA",
  "localeDisplayName" : "Canada",
  "localeCorporateLink" : "https://www.pearson.com/ca/",
  "languageCode" : "en",
  "languageDisplayName" : "English (Canada)",
  "bypassDestination" : "https://www.pearson.com/en-ca.html",
  "myLearningPagePath" : "https://www.pearson.com/en-ca/my-learning.html"
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearson.cl/paraguay/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/paraguay/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/paraguay/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "PY",
  "localeDisplayName" : "Paraguay",
  "localeCorporateLink" : "http://www.pearson.cl/paraguay/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Paraguay)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearson.cl/bolivia/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/bolivia/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/bolivia/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "BO",
  "localeDisplayName" : "Bolivia",
  "localeCorporateLink" : "http://www.pearson.cl/bolivia/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Bolivia)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearson.cl/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.cl/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "CL",
  "localeDisplayName" : "Chile",
  "localeCorporateLink" : "http://www.pearson.cl/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Chile)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "CN",
  "localeDisplayName" : "China",
  "localeCorporateLink" : "http://www.pearson.com.cn",
  "languageCode" : "zh",
  "languageDisplayName" : "Chinese (China)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonenespanol.com/co/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/co/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/co/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "CO",
  "localeDisplayName" : "Colombia",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/co/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Colombia)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.se/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonassessment.dk/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "DK",
  "localeDisplayName" : "Denmark",
  "localeCorporateLink" : "N/A",
  "languageCode" : "dk",
  "languageDisplayName" : "dk (Denmark)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonenespanol.com/ec/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/ec/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/ec/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "EC",
  "localeDisplayName" : "Ecuador",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/ec/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Ecuador)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.de",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.de/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "DE",
  "localeDisplayName" : "Germany",
  "localeCorporateLink" : "https://de.pearson.com/de_DE.html",
  "languageCode" : "de",
  "languageDisplayName" : "German (Germany)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.fr/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.talentlens.fr/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "FR",
  "localeDisplayName" : "France",
  "localeCorporateLink" : "https://www.pearson.fr/",
  "languageCode" : "fr",
  "languageDisplayName" : "French (France)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com.hk/zh_HK.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "HK",
  "localeDisplayName" : "Hong Kong",
  "localeCorporateLink" : "https://www.pearson.com.hk/zh_HK.html",
  "languageCode" : "zh",
  "languageDisplayName" : "Chinese (Hong Kong SAR China)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.amazon.in/l/11632196031?tag=pearindieduc-21",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.amazon.in/l/11632196031?tag=pearindieduc-21",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://pearsonclinical.in/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://talentlens.in/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "IN",
  "localeDisplayName" : "India",
  "localeCorporateLink" : "https://in.pearson.com/",
  "languageCode" : "en",
  "languageDisplayName" : "English (India)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.it/catalogo",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://it.pearson.com/",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://it.pearson.com/",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "IT",
  "localeDisplayName" : "Italy",
  "localeCorporateLink" : "https://it.pearson.com/",
  "languageCode" : "it",
  "languageDisplayName" : "Italian (Italy)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonenespanol.com/mx/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/mx/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonenespanol.com/mx/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "MX",
  "localeDisplayName" : "Mexico",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/mx/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Mexico)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/nl/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/nl/en_NL/higher-education.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearsonclinical.nl/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.talentlens.nl/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "NL",
  "localeDisplayName" : "Netherlands",
  "localeCorporateLink" : "https://www.pearson.com/nl/nl_NL.html",
  "languageCode" : "nl",
  "languageDisplayName" : "Dutch (Netherlands)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/en-nz/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://pearsoned.co.nz/",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.com.au/locale-nz.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "NZ",
  "localeDisplayName" : "New Zealand",
  "localeCorporateLink" : "http://www.pearsoned.co.nz/",
  "languageCode" : "en",
  "languageDisplayName" : "English (New Zealand)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.se/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonassessment.no/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "NO",
  "localeDisplayName" : "Norway",
  "localeCorporateLink" : "N/A",
  "languageCode" : "no",
  "languageDisplayName" : "Norwegian (Norway)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearsonperu.pe/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearsonperu.pe/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearsonperu.pe/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "PE",
  "localeDisplayName" : "Peru",
  "localeCorporateLink" : "http://www.pearsonperu.pe",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Peru)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.asia/locale-sg.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/asia/industry/health-psychology.html",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "SG",
  "localeDisplayName" : "Singapore",
  "localeCorporateLink" : "https://www.pearson.com/asia/",
  "languageCode" : "en",
  "languageDisplayName" : "English (Singapore)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsoneducacion.net/espa%C3%B1a/TiendaOnline",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsoneducacion.net/espa%C3%B1a/inicio",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearsonclinical.es/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "ES",
  "localeDisplayName" : "Spain",
  "localeCorporateLink" : "http://www.pearsoneducacion.net/espa%C3%B1a/inicio",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Spain)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://shop.pearson.co.za/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://za.pearson.com/",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://za.pearson.com/",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "ZA",
  "localeDisplayName" : "South Africa",
  "localeCorporateLink" : "https://za.pearson.com/",
  "languageCode" : "en",
  "languageDisplayName" : "English (South Africa)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonclinical.se/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonassessment.se/",
    "storeName" : "Assessments",
    "isInternalLink" : false
  } ],
  "localeCode" : "SE",
  "localeDisplayName" : "Sweden",
  "localeCorporateLink" : "N/A",
  "languageCode" : "se",
  "languageDisplayName" : "Northern Sami (Sweden)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearsonyayinlari.com/",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://tr.pearson.com/tr.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://tr.pearson.com/tr.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "TR",
  "localeDisplayName" : "Turkey",
  "localeCorporateLink" : "https://tr.pearson.com/tr.html",
  "languageCode" : "tr",
  "languageDisplayName" : "Turkish (Turkey)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/uk/learners.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearson.com/uk/educators.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonclinical.co.uk/locale-gb.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.talentlens.co.uk/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "GB",
  "localeDisplayName" : "United Kingdom",
  "localeCorporateLink" : "https://www.pearson.com/uk/",
  "languageCode" : "en",
  "languageDisplayName" : "English (United Kingdom)",
  "bypassDestination" : "/en-gb.html",
  "myLearningPagePath" : "https://www.pearson.com/en-gb/my-learning.html"
}, {
  "stores" : [ {
    "storeUrl" : "http://www.pearson.com.uy/estudiantes.html",
    "storeName" : "Student",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.com.uy/docentes.html",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://www.pearson.com.uy/profesionales.html",
    "storeName" : "Clinician",
    "isInternalLink" : false
  } ],
  "localeCode" : "UY",
  "localeDisplayName" : "Uruguay",
  "localeCorporateLink" : "http://www.pearson.com.uy/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Uruguay)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ {
    "storeUrl" : "https://www.pearson.com/en-us.html",
    "storeName" : "Student",
    "isInternalLink" : true
  }, {
    "storeUrl" : "https://www.pearson.com/us",
    "storeName" : "Teacher",
    "isInternalLink" : false
  }, {
    "storeUrl" : "https://www.pearsonassessments.com/locale-us.html",
    "storeName" : "Assessments",
    "isInternalLink" : false
  }, {
    "storeUrl" : "http://us.talentlens.com/",
    "storeName" : "Talentlens",
    "isInternalLink" : false
  } ],
  "localeCode" : "US",
  "localeDisplayName" : "United States",
  "localeCorporateLink" : "https://www.pearson.com/us/",
  "languageCode" : "en",
  "languageDisplayName" : "English (United States)",
  "bypassDestination" : "https://www.pearson.com/en-us.html",
  "myLearningPagePath" : "https://www.pearson.com/en-us/my-learning.html"
}, {
  "stores" : [ ],
  "localeCode" : "JP",
  "localeDisplayName" : "Japan",
  "localeCorporateLink" : "https://www.pearson.co.jp/",
  "languageCode" : "ja",
  "languageDisplayName" : "Japanese (Japan)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "PL",
  "localeDisplayName" : "Poland",
  "localeCorporateLink" : "https://www.pearson.pl/",
  "languageCode" : "pl",
  "languageDisplayName" : "Polish (Poland)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "CR",
  "localeDisplayName" : "Costa Rica",
  "localeCorporateLink" : "https://www.pearsoneducacion.net/CR/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Costa Rica)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "SV",
  "localeDisplayName" : "El Salvador",
  "localeCorporateLink" : "https://www.pearsoneducacion.net/SV/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (El Salvador)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "GT",
  "localeDisplayName" : "Guatemala",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/GU/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Guatemala)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "HN",
  "localeDisplayName" : "Honduras",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/HN/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Honduras)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "PR",
  "localeDisplayName" : "Puerto Rico",
  "localeCorporateLink" : "http://www.pearsoneducacion.net/puerto-rico/inicio",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Puerto Rico)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "DO",
  "localeDisplayName" : "Dominican Republic",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/RD/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Dominican Republic)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "NI",
  "localeDisplayName" : "Nicaragua",
  "localeCorporateLink" : "https://www.pearsonenespanol.com/NI/",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Nicaragua)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
}, {
  "stores" : [ ],
  "localeCode" : "VE",
  "localeDisplayName" : "Venezuela",
  "localeCorporateLink" : "http://www.pearsoneducacion.net/venezuela/inicio",
  "languageCode" : "es",
  "languageDisplayName" : "Spanish (Venezuela)",
  "bypassDestination" : "",
  "myLearningPagePath" : ""
} ],
        geoLocationPriority: "false",
        popUpContent: {
  "weThinkYouAreInThisCountry" : "<div class=\"weThinkYouAreInThisCountry modal-window\">\n\n<div class=\"pop-up\" role=\"dialog\" aria-modal=\"true\" aria-hidden=\"false\">\n    <div class=\"pop-up__content isCentered\">\n        \n\n        <h4 class=\"pop-up__title\">\n            Hello!\n        </h4>\n\n        <label for=\"destination\">\n            We think you are in the ${user_current_locale}\n        </label>\n\n        <button class=\"pop-up__button\" data-destination=\"#\">\n            Continue to the ${user_current_locale} site\n        </button>\n\n        \n\n        \n\n        <a href=\"#\" class=\"pop-up__link pop-up__choose-location-link\">\n            Choose another country\n        </a>\n\n        \n    </div>\n\n    <button class=\"pop-up-close\" aria-label=\"Close\"></button>\n</div>\n\n\n\n    \n\n\t\n    \n\n\t\n    \n\n</div>\n",
  "productNotAvailable" : "<div class=\"productNotAvailable modal-window\">\n\n<div class=\"pop-up\" role=\"dialog\" aria-modal=\"true\" aria-hidden=\"false\">\n    <div class=\"pop-up__content isCentered\">\n        \n\n        <h4 class=\"pop-up__title\">\n            Hello!\n        </h4>\n\n        <label for=\"destination\">\n            The product you are trying to access is not available in your browsing country\n        </label>\n\n        \n\n        \n            <button class=\"pop-up__button\" data-destination=\"\">\n                Go to the ${user_current_locale} site\n            </button>\n            <button class=\"pop-up__button pop-up-button-close\" data-destination=\"\">\n                Stay on the ${page_current_locale} site\n            </button>\n        \n\n        \n\n        <a href=\"#\" class=\"pop-up__link pop-up__choose-location-link\">\n            Choose another country\n        </a>\n\n        <p class=\"pop-up__note\">\n            Note: We may not be able to ship this product to you if you change your country. Products on the ${page_current_locale} site cannot be shipped to ${user_current_locale}\n        </p>\n    </div>\n\n    <button class=\"pop-up-close\" aria-label=\"Close\"></button>\n</div>\n\n\n\n    \n\n\t\n    \n\n\t\n    \n\n</div>\n",
  "weThinkYouWillEnjoy" : "<div class=\"weThinkYouWillEnjoy modal-window\">\n\n<div class=\"pop-up\" role=\"dialog\" aria-modal=\"true\" aria-hidden=\"false\">\n    <div class=\"pop-up__content isCentered\">\n        \n\n        <h4 class=\"pop-up__title\">\n            Hello!\n        </h4>\n\n        <label for=\"destination\">\n            We think you&#39;ll enjoy our ${user_current_locale} store\n        </label>\n\n        \n\n        \n            <button class=\"pop-up__button\" data-destination=\"\">\n                Go to the ${user_current_locale} site\n            </button>\n            <button class=\"pop-up__button pop-up-button-close\" data-destination=\"\">\n                Stay on the ${page_current_locale} site\n            </button>\n        \n\n        \n\n        <a href=\"#\" class=\"pop-up__link pop-up__choose-location-link\">\n            Choose another country\n        </a>\n\n        \n    </div>\n\n    <button class=\"pop-up-close\" aria-label=\"Close\"></button>\n</div>\n\n\n\n    \n\n\t\n    \n\n\t\n    \n\n</div>\n",
  "selectYourStore" : "<div class=\"selectYourStore modal-window\">\n\n<div class=\"pop-up\" role=\"dialog\" aria-modal=\"true\" aria-hidden=\"false\">\n    <div class=\"pop-up__content isCentered\">\n        \n\n        <h4 class=\"pop-up__title\">\n            Our stores\n        </h4>\n\n        <label for=\"destination\">\n            Select the store you would like to visit\n        </label>\n\n        \n\n        \n\n        <div class=\"modal-window__control-wrap\">\n            <div class=\"select-wrapper\">\n                <select name=\"destination\" id=\"destination\" class=\"input\">\n                    <option value=\"\" disabled=\"disabled\" selected=\"selected\">\n                        Please select\n                    </option>\n                </select>\n            </div>\n            <button class=\"pop-up__button pop-up__button__select\">\n                Go\n            </button>\n        </div>\n\n        \n\n        <p class=\"pop-up__note\">\n            When selecting your store, please know we can only ship items to that specific country and nowhere else.\n        </p>\n    </div>\n\n    <button class=\"pop-up-close\" aria-label=\"Close\"></button>\n</div>\n\n\n\n    \n\n\t\n    \n\n\t\n    \n\n</div>\n"
},
        key : {
            page_current_locale : /\$\{page_current_locale\}/g,
            user_current_locale : /\$\{user_current_locale\}/g
        }
    };

})(jQuery);

// Geolocation Cookie functionality
var DMCP = DMCP || {};

(function() {
    'use strict';

    DMCP.Geolocation = DMCP.Geolocation || {};

    DMCP.Geolocation.Cookie = {};

    // Create cookie function
    DMCP.Geolocation.Cookie.createCookie = function(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else {
            expires = "";
        }
        var domain = "";
        if (DMCP.Geolocation._config.geoCookieDomain) {
            domain = DMCP.Geolocation._config.geoCookieDomain;
        }
        document.cookie = name+"="+value+expires+"; domain="+domain+"; path=/";
    };

    // Read cookie
    DMCP.Geolocation.Cookie.readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    };

    // Erase cookie
    DMCP.Geolocation.Cookie.eraseCookie = function(name) {
        DMCP.Geolocation.Cookie.createCookie(name,"",-1);
    };

})();

// Geolocation modal building logic
var DMCP = DMCP || {};

(function() {
    'use strict';

    DMCP.Geolocation = DMCP.Geolocation || {};

    var LOCALE_LINK_DELIMITER = "|";

    // Context Global property that indicates if the modal is currently active.
    var modalActive = false;

    // Context Global property to reference the current active modal.
    var currentModal;

    // Context Global property that indicates if the modal BG is currently active.
    var modalBGActive = false;

    // Context Global property to reference the modal background modal object.
    var modalBG;

    /*
        Close the current modal IF it is currently active
    */
    DMCP.Geolocation.closeModal = function() {
        if (modalActive) {
            if (currentModal) {
                currentModal.remove();
            }

            currentModal = null;
            modalActive = false;
        }
    };

    /*
        Close the current modal BG IF it is currently active
    */
    DMCP.Geolocation.closeModalBG = function() {
        if (modalBGActive) {
            if (modalBG) {
                modalBG.remove();
            }

            modalBG = null;
            modalBGActive = false;
        }
    };

    /*
        Close both the modal and the BG
    */
    DMCP.Geolocation.closeModalAndBG = function() {
        DMCP.Geolocation.Cookie.createCookie("isGeolocationModalSuppressed", true, 30);
        DMCP.Geolocation.closeModalBG();
        DMCP.Geolocation.closeModal();
    }

    /*
        Builds the a modal based on the config, appends the modal to the page and sets up the click events.

        @param modalConfig : API for the modalConfig as follows -
        {
            modalContent : "",
            storeType : "",
            openLinkInNewTab: boolean,
            currentPageLocale : "",
            currentUserLocale : "",
            cta : [ "links", "links" ],
            storeLinks : [
                {
                    localeCode: "",
                    localeDisplayName: "",
                    storeUrl: ""
                }
            ]
        }
    */
    DMCP.Geolocation.buildModal = function(modalConfig) {

        // Get the modal HTML from the Geolocation config
        var modalHTMLContent = DMCP.Geolocation._config.popUpContent[modalConfig.modalContent];

        // Discontinue building the modal if the modalContent is empty
        if (!modalHTMLContent) {
            DMCP.Geolocation.closeModalAndBG();

            return;
        }

        // Replace the the placeholders elements for user_current_locale with the real locale values
        if (modalConfig.currentUserLocale) {
            modalHTMLContent = modalHTMLContent.replace(
                                    DMCP.Geolocation._config.key.user_current_locale,
                                    DMCP.Geolocation.getLocaleLabel(modalConfig.currentUserLocale));
        }

        // Replace the the placeholders elements for page_current_locale with the real locale values
        if (modalConfig.currentPageLocale) {
            modalHTMLContent = modalHTMLContent.replace(
                                    DMCP.Geolocation._config.key.page_current_locale,
                                    DMCP.Geolocation.getLocaleLabel(modalConfig.currentPageLocale));
        }

        // Create modal background element IF it is not currently active, and add it to the page
        if (!modalBGActive) {
            modalBG = $('<div>', {class: 'modal-window__bg-mask'});
            $("body").append(modalBG);
            modalBGActive = true;
        }

        // IF there is a modal already active then close and replace it with new current modal
        if (modalActive) {
            DMCP.Geolocation.closeModal();
        }

        // Create a jQuery object based on the modalHTMLContent
        currentModal = $($.parseHTML(modalHTMLContent));

        // Set the modal to visible and add the modal to the body content
        currentModal.find(".pop-up").css("display", "block");
        $("body").append(currentModal);
        modalActive = true;

        // Find the CTA's and add the link values to them
        if (modalConfig.cta && modalConfig.cta.length) {
            $.each(modalConfig.cta, function(i, cta) {
                var $cta = currentModal.find("[class='pop-up__button']").eq(i);

                if ($cta.length) {
                    $cta.data("destination", cta);
                }
            });
        }

        // Add the store links to the country dropdown element IF the element is present AND the config is present
        if (modalConfig.storeLinks &&
            modalConfig.storeLinks.length &&
            currentModal.find(".select-wrapper").length) {

            $.each(modalConfig.storeLinks, function(i, storeLink) {
                var input = currentModal.find(".select-wrapper .input");

                // Create an option element with the content
                var $option = $('<option>', {
                        value: storeLink.localeCode + LOCALE_LINK_DELIMITER + storeLink.storeUrl,
                        text:storeLink.localeDisplayName });

                input.append($option);
            });
        }

        $(currentModal).on('click', '.pop-up-close', function(e) {
            DMCP.Geolocation.closeModalAndBG();
        });

        $(currentModal).on('click', '.pop-up-button-close', function(e) {
          DMCP.Geolocation.closeModalAndBG();
        });

        $(modalBG).on('click', function(e) {
            DMCP.Geolocation.closeModalAndBG();
        });

        // Logic for the modal button CTA buttons
        $(currentModal).on('click', '.pop-up__button', function(e) {
            var clickDestination = $(this).data("destination");

            if (!clickDestination) {
                // If the link is not valid then escape
                return;
            }

            if (clickDestination.indexOf(LOCALE_LINK_DELIMITER) > -1) {
                var locale = clickDestination.split(LOCALE_LINK_DELIMITER)[0];
                var storePath = clickDestination.split(LOCALE_LINK_DELIMITER)[1];

                DMCP.Geolocation.Cookie.createCookie("geotargetchosenlocale", locale, 30);
                DMCP.Geolocation.updateLocale();

                DMCP.Geolocation.navigate(storePath, modalConfig.openLinkInNewTab);
                DMCP.Geolocation.closeModalAndBG();
            } else {
                DMCP.Geolocation.navigate(clickDestination, modalConfig.openLinkInNewTab);
                DMCP.Geolocation.closeModalAndBG();
            }

        });

        // Logic for clicking on the dropdown list submit button
        $(currentModal).on('click', '.pop-up__button__select', function(e) {
            var $input = currentModal.find(".select-wrapper .input");

            // On click get destination of the button from the dropdown list
            var inputValue = $input.val();
            if (inputValue) {
                var locale = inputValue.split(LOCALE_LINK_DELIMITER)[0];
                var storePath = inputValue.split(LOCALE_LINK_DELIMITER)[1];

                DMCP.Geolocation.Cookie.createCookie("geotargetchosenlocale", locale, 30);
                DMCP.Geolocation.updateLocale();

                DMCP.Geolocation.navigate(storePath, modalConfig.openLinkInNewTab);
                DMCP.Geolocation.closeModalAndBG();
            }
        });

        // Logic for clicking on the choose modal button
        $(currentModal).on('click', '.pop-up__choose-location-link', function(e) {
            e.preventDefault();

            DMCP.Geolocation.createSelectYouCountryModal(modalConfig.storeType, modalConfig.openLinkInNewTab);
        });

    }

    /*
        Create the modal, this will create the modal and then append it to the HTML of the page as well

        @param modalType    :  the ID for the modal that we want to display; should match whats in DMCP.Geolocation._config.popUpContent
        @param storeType    :  i.e "Student" or "Educator" or "Assessments"
        @param openLinkInNewTab :  true if the links for the modal should be opened in a new tab
    */
    DMCP.Geolocation.createModal = function(modalType, storeType, openLinkInNewTab) {

        if ("selectYourStore".toLowerCase() === modalType.toLowerCase()) {
            DMCP.Geolocation.createSelectYouCountryModal(storeType, openLinkInNewTab);

        } else if ("weThinkYouWillEnjoy".toLowerCase() === modalType.toLowerCase()) {
          DMCP.Geolocation.createUserIsGeolocatedModal(storeType, openLinkInNewTab, 'weThinkYouWillEnjoy');

        } else if ("userIsGeolocated".toLowerCase() === modalType.toLowerCase()) {
            DMCP.Geolocation.createUserIsGeolocatedModal(storeType, openLinkInNewTab, 'weThinkYouAreInThisCountry');

        } else if ("forwardUser".toLowerCase() === modalType.toLowerCase()) {
            DMCP.Geolocation.createForwardModal(storeType, openLinkInNewTab);

        }
    };

    /*
        Creates a modal with a country select dropdown

        @param storeType :  i.e "Student" or "Educator" or "Assessments"
        @param openLinkInNewTab :  true if the links for the modal should be opened in a new tab
    */
    DMCP.Geolocation.createSelectYouCountryModal = function(storeType, openLinkInNewTab) {

        // we have the appropriate links and link labels for the store
        var storeLinksForStoreType = DMCP.Geolocation.getLocaleLinksForStoreType(storeType);

        DMCP.Geolocation.buildModal({
            modalContent: 'selectYourStore',
            storeType: storeType,
            openLinkInNewTab: openLinkInNewTab,
            currentPageLocale: DMCP.Geolocation._config.currentPageLocale,
            currentUserLocale: DMCP.Geolocation._config.userLocale,
            storeLinks: storeLinksForStoreType
        });
    };

    /*
        Build the modal with the content 'weThinkYouAreInThisCountry'; assumes the users location has already been
        detected.

        @param storeType :  i.e "Student" or "Educator" or "Assessments"
        @param openLinkInNewTab :  true if the links for the modal should be opened in a new tab
    */
    DMCP.Geolocation.createUserIsGeolocatedModal = function(storeType, openLinkInNewTab, modalContent) {

        // At this point the user has a location, but not a chosen location
        var localeDisplayName = DMCP.Geolocation.getLocaleLabel(DMCP.Geolocation._config.userLocale);
        var localeStorePath = DMCP.Geolocation.getLinkForStoreTypeAndLocale(storeType, DMCP.Geolocation._config.userLocale);

        // If there is no locale store for their chosen locale, then we display that we have no store
        if (typeof localeStorePath === "undefined") {
            DMCP.Geolocation.createSelectYouCountryModal(storeType, openLinkInNewTab);

            return;
        }

        DMCP.Geolocation.buildModal({
            modalContent: modalContent,
            storeType: storeType,
            openLinkInNewTab: openLinkInNewTab,
            currentPageLocale: DMCP.Geolocation._config.currentPageLocale,
            currentUserLocale: DMCP.Geolocation._config.userLocale,
            cta: [ DMCP.Geolocation._config.userLocale + LOCALE_LINK_DELIMITER + localeStorePath ]
        })
    };

    /*
        If the users current locale has a store link we will forward the users browser to the correct locale.

        If the users current locale IS NOT supported, we will show a modal where the user can select the content they want.

        @param storeType :  i.e "Student" or "Educator" or "Assessments"
        @param openLinkInNewTab :  true if the links for the modal should be opened in a new tab
    */
    DMCP.Geolocation.createForwardModal = function(storeType, openLinkInNewTab) {

        var localeStorePath =
            DMCP.Geolocation.getLinkForStoreTypeAndLocale(storeType, DMCP.Geolocation._config.userLocale);

        // If there is no locale store for their chosen locale, then we display that we have no store
        if (typeof localeStorePath === "undefined") {
            DMCP.Geolocation.createSelectYouCountryModal(storeType, openLinkInNewTab);

            return;
        }

        DMCP.Geolocation.navigate(localeStorePath, openLinkInNewTab);
        DMCP.Geolocation.closeModalAndBG();
    };

    /*
        Navigate the browser to the specified url.

        @param url : the url to navigate to.
        @param openLinkInNewTab : true if the links for the modal should be opened in a new tab.
    */
    DMCP.Geolocation.navigate = function(url, openLinkInNewTab) {
        if (openLinkInNewTab) {
            window.open(url, '_blank');
        } else {
            location.href = url;
        }
    };

})();

// Core config and functionality for setting up the page events and processing the config
var DMCP = DMCP || {};

(function($) {
    'use strict';

    var URL_MATCH = /.*\/([A-Za-z]{2})-([A-Za-z]{2})\/.*/;

    DMCP.Geolocation = DMCP.Geolocation || {};

    /*
        Init the functionality to track the current users locale; fires location detection AJAX request.

        If the cookie "geotargetsite" has already been set, then the location detection AJAX request will not be sent.
    */
    DMCP.Geolocation.trackUserLocale = function() {
        if (DMCP.Geolocation.Cookie.readCookie("geotargetsite") == "GLB" || DMCP.Geolocation.Cookie.readCookie("geotargetsite") == "CORP") {
        // if the cookie value us GLB, then remove the cookie
            DMCP.Geolocation.Cookie.eraseCookie("geotargetsite");
        }

        DMCP.Geolocation.checkTheCurrentPageLocale();

        // If the cookie is not present then we should
        if (!DMCP.Geolocation.Cookie.readCookie("geotargetsite")) {

            // Call the servlet and then the cookie will be set or not set.
            return DMCP.Geolocation.akamaiResponse = $.ajax({
                url: DMCP.Geolocation._config.servletPath,
                type: 'GET',
                async: false
            }).always(function() {
                 DMCP.Geolocation.updateLocale();

             }); 
        }

        DMCP.Geolocation.updateLocale();
    };

    /*
        Get the store config based on the locale.

        @param locale : an iso locale code i.e "GB"
        return :        the config for a store based on the iso locale code for the store
    */
    DMCP.Geolocation.getStoreConfig = function(locale) {
        var config;

        if (DMCP.Geolocation._config.storeLocaleConfig) {
            $.each(DMCP.Geolocation._config.storeLocaleConfig, function(index, value) {
                if (value.localeCode.toLowerCase() === locale.toLowerCase()) {
                    config = value;
                }
            });
        }

        return config;
    };

    /*
        Get the global store config

        returns : The global store config, containing the links to the global versions of the stores.
    */
    DMCP.Geolocation.getGlobalConfig = function() {
        return DMCP.Geolocation.getStoreConfig("Global");
    };

    /*
        Based on the ISO code for a locale, get the display value for the locale.

        This information is stored within DMCP.Geolocation._config.storeLocaleConfig - each supported store contains a
        locale code as well as a locale display name.

        @param locale : An iso locale code i.e "GB"
        returns :       The localeDisplay name, if the display name is not present, the iso locale code will be returned.
    */
    DMCP.Geolocation.getLocaleLabel = function(locale) {
        var localeLabel = locale;

        // The "US" locale will always show the US label
        if (locale === "US") {
            return localeLabel;
        }

        $.each(DMCP.Geolocation._config.storeLocaleConfig, function(i, storeLocaleItem) {

            if (storeLocaleItem.localeCode == locale) {
                localeLabel = storeLocaleItem.localeDisplayName;

                return false; // exit loop.
            }
        });

        return localeLabel;
    };

    /*
        Check the current pages locale and then set the property values to the DMCP.Geolocation._config.

        This method detects the current pages locale by checking the structure of the URL.
    */
    DMCP.Geolocation.checkTheCurrentPageLocale = function() {
        // Check the locale of the current page
        var pathMatches = location.pathname.match(URL_MATCH);
		var siteId = dataLayer[0]["site"]['siteId'].split('|');
		
        if (pathMatches ? true : false && pathMatches.length >= 3) {

            DMCP.Geolocation._config.currentPageLocale = pathMatches[2].toUpperCase();
            DMCP.Geolocation._config.currentPageIsGlobal = false;
        } else if (siteId[1]) {
			DMCP.Geolocation._config.currentPageLocale = siteId[1];
            DMCP.Geolocation._config.currentPageIsGlobal = false;
        } else {

            DMCP.Geolocation._config.currentPageLocale = "Global";
            DMCP.Geolocation._config.currentPageIsGlobal = true;
        }
    };

    /*
        Based on the storeList return the storeType, i.e "Student", for the given linkValue.

        @param linkValue :  A fully qualified link i.e https://www.example.com
        @param storeList :  A list of the stores that we want to check for a match on the linkValue
        returns :           The name of the store type i.e "Student" or "Educator" or "Assessments"
    */
    DMCP.Geolocation.getStoreTypeForLink = function(linkValue, storeList) {
        var storeType;

        // check that the urls match any of the global links
        $.each(storeList, function(index, storeLink) {
            if (linkValue.startsWith(storeLink.storeUrl)) {
                storeType = storeLink.storeName;

                return false; // exit loop.
            }
        });

        return storeType;
    };

    /*
        Based on the store store and the locale get the relevant link to the store that the user will need.

        @param storeType :  i.e "Student" or "Educator" or "Assessments" or "Talentlens"
        @param locale :     an iso locale code i.e "GB"
        returns :           A single link
    */
    DMCP.Geolocation.getLinkForStoreTypeAndLocale = function(storeType, locale) {
        var link;

        var localeLinksForStoreType = DMCP.Geolocation.getLocaleLinksForStoreType(storeType);

        $.each(localeLinksForStoreType, function(i, localeLinkItem) {
            if(localeLinkItem.localeCode.toLowerCase() === locale.toLowerCase()) {
                link = localeLinkItem.storeUrl;
                return false; // exit loop
            }
        });

        return link;
    };

    /*
        Get a list of all the store links for the storeType i.e all the "Student" store links

        @param : storeType i.e "Student" or "Educator" or "Assessments" or "Talenlens"
        returns : A list of stores, structured [{ localeCode:"US", localeDisplayName:"United States", storeUrl:"/" }]
    */
    DMCP.Geolocation.getLocaleLinksForStoreType = function(storeType) {
        var localeLinks = [];

        // loop over the list of locales and return the list of locales
        $.each(DMCP.Geolocation._config.storeLocaleConfig, function(i, localeConfig) {
            // We do not need global links.
            if (localeConfig.localeCode === "Global") {
                return true; // Continue to next item.
            }

            var localeContainsStoreType = false;
            var localeLinkItem = {
                localeCode : localeConfig.localeCode,
                localeDisplayName : localeConfig.localeDisplayName
            };

            $.each(localeConfig.stores, function(j, storeItem) {
                if (storeItem.storeName.toLowerCase() === storeType.toLowerCase()) {
                    localeContainsStoreType = true;

                    localeLinkItem.storeUrl = storeItem.storeUrl;
                }
            });

            if (localeContainsStoreType) {
                localeLinks.push(localeLinkItem);
            }
        });

        return localeLinks;
    };

    /*
        Based on the locale cookies that have been set, update the current state of the _config.
    */
    DMCP.Geolocation.updateLocale = function() {
        // check if the user has already chosen their locale
        if (DMCP.Geolocation._config.geoLocationPriority == "true") {
	        if (DMCP.Geolocation.Cookie.readCookie("geotargetsite")) {
	            DMCP.Geolocation._config.userLocale = DMCP.Geolocation.Cookie.readCookie("geotargetsite");
	            DMCP.Geolocation._config.localeIsChosen = true;
	        // Check if the user has been geolocated
	        } else if (DMCP.Geolocation.Cookie.readCookie("geotargetchosenlocale")) {
	            DMCP.Geolocation._config.userLocale = DMCP.Geolocation.Cookie.readCookie("geotargetchosenlocale");
	            DMCP.Geolocation._config.localeIsChosen = false;
	        // if no cookies are present then set the state to default
	        } else {
	            DMCP.Geolocation._config.userLocale = "NA";
	            DMCP.Geolocation._config.localeIsChosen = false;
	        }
        }
        else {
	        if (DMCP.Geolocation.Cookie.readCookie("geotargetchosenlocale")) {
	            DMCP.Geolocation._config.userLocale = DMCP.Geolocation.Cookie.readCookie("geotargetchosenlocale");
	            DMCP.Geolocation._config.localeIsChosen = true;
	        // Check if the user has been geolocated
	        } else if (DMCP.Geolocation.Cookie.readCookie("geotargetsite")) {
	            DMCP.Geolocation._config.userLocale = DMCP.Geolocation.Cookie.readCookie("geotargetsite");
	            DMCP.Geolocation._config.localeIsChosen = false;
	        // if no cookies are present then set the state to default
	        } else {
	            DMCP.Geolocation._config.userLocale = "NA";
	            DMCP.Geolocation._config.localeIsChosen = false;
	        }        
        }
    };

})(jQuery);