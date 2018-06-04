var get = require('lodash.get')
var shortenLocale = require('../shortenLocale')
var isLocaleSupported = require('../isLocaleSupported')
var FALLBACK_LOCALE = 'en'

function getSupportedLocale (options) {
  var _isLocaleSupported = isLocaleSupported(options)

  return function (locale) {
    var shortLocale = shortenLocale(locale)
    var defaultLocale = get(options, 'defaultLocale', FALLBACK_LOCALE)

    if (_isLocaleSupported(locale)) {
      return locale
    } else if (_isLocaleSupported(shortLocale)) {
      return shortLocale
    } else {
      return defaultLocale
    }
  }
}

module.exports = getSupportedLocale
