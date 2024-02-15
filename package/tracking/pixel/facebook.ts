/* eslint-disable */

export const fbq = {
    load() {
        // @ts-ignore
        !function (f, b, e, v, n, t, s) {
        // @ts-ignore
        if (f.fbq) return; n = f.fbq = function () {
            // @ts-ignore
            n.callMethod ?
            // @ts-ignore
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        // @ts-ignore
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        // @ts-ignore
        n.queue = []; t = b.createElement(e); t.async = !0;
        // @ts-ignore
        t.src = v; s = b.getElementsByTagName(e)[0];
        // @ts-ignore
        s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    },
    // @ts-ignore
    track(...args) {
        // @ts-ignore
        return window.fbq(...args);
    },
    grant() {
        // @ts-ignore
        window.fbq('consent', 'grant');
    },
    revoke() {
        // @ts-ignore
        window.fbq('consent', 'revoke');
    }
};
  