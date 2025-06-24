import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import './App.css';
import { appRoutes, authRoutes } from './config/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import { APP_ROUTES, IS_RUSSIAN, LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { useTypedSelector, useTypedDispatch } from '@app/store';
import { isMobile, isTablet } from 'react-device-detect';
import { changeLanguage as changeLang } from '@app/store/actions';
import * as Sentry from '@sentry/react';
import { captureConsoleIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: 'https://02f7b8505e32412e925c8ed3aae7bed8@o4507554416885760.ingest.us.sentry.io/4507554418327552',
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
    captureConsoleIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/api\.lifelinq\.ai/, /^https:\/\/api\.mobilmed\.ai/],
});

function App() {
  const { isAuthenticated, user } = useAuth();
  const { changeLanguage } = useLocalization();
  const { language, isCustomSet } = useTypedSelector((state) => state.lang);
  const [isDesktopMode, setIsDesktopMode] = useState(!isMobile && !isTablet);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktopMode = window.innerWidth > 1024;
      setIsDesktopMode(newIsDesktopMode);
    };

    const handleRedirect = () => {
      // console.log(isDesktopMode , isAuthenticated)
      if (isDesktopMode && isAuthenticated) {
        navigate(APP_ROUTES.desktop_screen);
      } else if (!isDesktopMode && isAuthenticated) {
        navigate(APP_ROUTES.home);
      } else if (isDesktopMode && !isAuthenticated) {
        // navigate(APP_ROUTES.desktop_screen);
      } else if (!isAuthenticated) {
        // navigate(APP_ROUTES.login);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    handleRedirect();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktopMode]);

  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = !IS_RUSSIAN ? '/favicon.png' : '/favicon-rus.png';
    }
  }, []);

  useEffect(() => {
    if (!isCustomSet) {
      changeLanguage(IS_RUSSIAN ? LANGS.RUSSIAN : LANGS.ENGLISH);
      dispatch(changeLang(IS_RUSSIAN ? LANGS.RUSSIAN : LANGS.ENGLISH));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {(!isAuthenticated ? authRoutes : appRoutes).map(({ path, page: Page }, index) => (
          <Route path={path} key={index} element={<Page />} />
        ))}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              user && user.firstName && user.lastName ? (
                <Navigate to={APP_ROUTES.home} />
              ) : (
                <Navigate to={APP_ROUTES.profile} />
              )
            ) : (
              <Navigate to={APP_ROUTES.login} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
