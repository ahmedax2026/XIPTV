/* Track outbound WhatsApp link clicks for Google Ads.
 * A click means WhatsApp was opened; it is not a sent message or paid subscription.
 * The base Google tag is loaded once, directly in the HTML <head>.
 */
(function () {
  'use strict';
  var conversionId = 'AW-18462139495/UC1ZCO3e8ZgdEOfIt-NE';

  document.addEventListener('click', function (event) {
    var target = event.target;
    var element = target && (target.nodeType === 1 ? target : target.parentElement);
    var link = element && element.closest && element.closest('a[href]');
    if (!link) return;

    var url;
    try {
      url = new URL(link.href, document.baseURI);
    } catch (err) {
      return;
    }

    var host = url.hostname.toLowerCase();
    if (host !== 'wa.me' && host !== 'api.whatsapp.com' &&
        host !== 'web.whatsapp.com' && host !== 'www.whatsapp.com') {
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: conversionId });
    }
  }, true);
})();
