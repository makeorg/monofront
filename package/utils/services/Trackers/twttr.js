/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const twitter = {
  initialized() {
    return window && window.twq !== undefined;
  },

  track(eventName, action, eventId) {
    window.twq('event', eventName, {
      description: action,
      conversion_id: eventId,
    });
  },
};
