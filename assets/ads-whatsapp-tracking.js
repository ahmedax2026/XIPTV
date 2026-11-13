/* Google Ads: track outbound WhatsApp clicks, not completed conversations or purchases. */
(function () {
  'use strict';
  var tagId = 'AW-18462139495';
  var conversionId = 'AW-18462139495/UC1ZCO3e8ZgdEOfIt-NE';

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + tagId + '"]')) {
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
    document.head.appendChild(tag);
  }
  window.gtag('js', new Date());
  window.gtag('config', tagId);

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, document.baseURI); } catch (err) { return; }
    var host = url.hostname.toLowerCase();
    var isWhatsApp = host === 'wa.me' || host === 'api.whatsapp.com' || host === 'web.whatsapp.com' || host === 'www.whatsapp.com';
    if (!isWhatsApp) return;
    window.gtag('event', 'conversion', { send_to: conversionId });
  }, true);
})();
