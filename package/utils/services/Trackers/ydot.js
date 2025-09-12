/* eslint-disable */
export const ydot = {
  load(projectId, pixelId) {
    (function (w, d, t, r, u) {
      w[u] = w[u] || [];
      w[u].push({
        projectId: projectId,
        properties: {
          pixelId: pixelId,
        },
      });
      const s = d.createElement(t);
      s.src = r;
      s.async = true;
      s.onload = s.onreadystatechange = function () {
        let y;
        const rs = this.readyState;
        const c = w[u];
        if (rs && rs != 'complete' && rs != 'loaded') {
          return;
        }
        try {
          y = YAHOO.ywa.I13N.fireBeacon;
          w[u] = [];
          w[u].push = function (p) {
            y([p]);
          };
          y(c);
        } catch (e) {}
      };
      const scr = d.getElementsByTagName(t)[0];
      const par = scr.parentNode;
      par.insertBefore(s, scr);
    })(window, document, 'script', 'https://s.yimg.com/wi/ytc.js', 'dotq');
  },
  track(...args) {
    // return window.snaptr(...args);
    return window.dotq.push(...args);
  },
};
