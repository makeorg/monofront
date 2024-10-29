/* eslint-disable */
    export const snap = {
      load() {
        (function (e, t, n) {
          if (e.snaptr) return;
          var a = (e.snaptr = function () {
            a.handleRequest
              ? a.handleRequest.apply(a, arguments)
              : a.queue.push(arguments);
          });
          a.queue = [];
          var s = 'script';
          var r = t.createElement(s);
          r.async = !0;
          r.src = n;
          var u = t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r, u);
        })(window, document, 'https://sc-static.net/scevent.min.js');
      },
      track(...args) {
        return window.snaptr(...args);
      },
    };
