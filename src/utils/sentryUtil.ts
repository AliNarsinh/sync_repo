import * as Sentry from '@sentry/react';

export const setSentryUser = (email: string) => {
  console.info('SETTING USER IN SENTRY!');
  Sentry.setUser({ email: email });
};

export const unsetSentryUser = () => {
  Sentry.setUser(null);
};
