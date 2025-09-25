$(document).ready(function(){
    const el = document.getElementById('gaIdOpal');
    if (!el) { console.warn('[GA] #gaIdOpal not found'); return; }

    const gaId = (el.textContent || el.innerText || '').trim();
    if (!gaId.startsWith('G-')) {
        console.warn('[GA] Invalid GA4 Measurement ID:', gaId);
        return;
    }


    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }


    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    script.onload = function () {
        gtag('js', new Date());
        gtag('config', gaId, {
            anonymize_ip: true,
            transport_type: 'beacon'
        });
    };
    script.onerror = function(){ console.error('[GA] Failed to load gtag.js'); };

    document.head.appendChild(script);
})