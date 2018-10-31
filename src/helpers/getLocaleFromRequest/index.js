var get = require('lodash.get')

function getAcceptedLanguage (request, languages) {
  if (!request || typeof request.acceptsLanguages !== 'function') {
    return
  }

  return request.acceptsLanguages(languages);
}

function getQueryFromRequest (request) {
  return function (param, key) {
    if (param) {
      return param
    }

    try {
      return request.query[key] ? decodeURIComponent(request.query[key]) : null
    } catch (error) {
      return null
    }
  }
}

function getLocaleFromRequest (options) {
  var cookieName = get(options, 'cookieName', 'locale')
  var params = get(options, 'queryParams', ['locale'])
  var queryParams = typeof params === 'string' ? [params] : params

  return function (request) {
    var locale = (
      queryParams.reduce(getQueryFromRequest(request), null) ||
      get(request, ['cookies', cookieName]) ||
      getAcceptedLanguage(request, get(options, 'supportedLocales')) ||
      get(request, 'acceptedLanguages') ||
      get(request, 'hostname.locale')
    )

    return Array.isArray(locale) ? locale[0] : locale
  }
}

module.exports = getLocaleFromRequest
