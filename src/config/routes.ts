import BinahTutorial from '@app/pages/binah_tutorial';
import Login from '@app/pages/login';
import ForgotPassword from '@app/pages/forgot_password';
import Signup from '@app/pages/signup';
import { APP_ROUTES } from '@app/constants';
import ResetPassword from '@app/pages/reset_password';
import PrivacyPolicy from '@app/pages/privacy_policy';
import MeasureSkin from '@app/pages/measure_skin';
import Version from '@app/pages/version';
import Settings from '@app/pages/settings';
import HealthSettings from '@app/pages/health_settings';
import Home from '@app/pages/home';
import Profile from '@app/pages/profile';
import VitalSigns from '@app/pages/vital_signs';
import Processing from '@app/pages/processing';
import Recommand from '@app/pages/recommand';
import Results from '@app/pages/results';
import Skin from '@app/pages/skin';
import MeasureVirtals from '@app/pages/measure_vitals';
import Vitalsigntutorial from '@app/pages/vital_sign_tutorial';
import Calander from '@app/pages/Calender';
import Wellness from '@app/pages/wellness_score';
import change_language from '@app/pages/change_language';
import DesktopScreen from '@app/pages/desktop_screen';

export type Route = {
  path: string;
  page: React.FC;
};

export const appRoutes: Route[] = [
  {
    path: APP_ROUTES.tutorial_binah,
    page: BinahTutorial,
  },
  {
    path: APP_ROUTES.home,
    page: Home,
  },
  {
    path: APP_ROUTES.privacy_policy,
    page: PrivacyPolicy,
  },
  {
    path: APP_ROUTES.measure_skin,
    page: MeasureSkin,
  },
  {
    path: APP_ROUTES.version,
    page: Version,
  },
  {
    path: APP_ROUTES.settings,
    page: Settings,
  },
  {
    path: APP_ROUTES.health_settings,
    page: HealthSettings,
  },
  {
    path: APP_ROUTES.profile,
    page: Profile,
  },
  {
    path: APP_ROUTES.vital_signs,
    page: VitalSigns,
  },
  {
    path: APP_ROUTES.processing,
    page: Processing,
  },
  {
    path: `${APP_ROUTES.recommand}/:id`,
    page: Recommand,
  },
  {
    path: APP_ROUTES.results,
    page: Results,
  },
  {
    path: APP_ROUTES.skin,
    page: Skin,
  },
  {
    path: APP_ROUTES.measure_vitals,
    page: MeasureVirtals,
  },
  {
    path: APP_ROUTES.tutorial_skinive,
    page: Vitalsigntutorial,
  },
  {
    path: APP_ROUTES.calendar,
    page: Calander,
  },
  {
    path: `${APP_ROUTES.wellness}/:id`,
    page: Wellness,
  },
  {
    path: APP_ROUTES.change_language,
    page: change_language,
  },
  {
    path: APP_ROUTES.desktop_screen,
    page: DesktopScreen,
  },
];

export const authRoutes: Route[] = [
  {
    path: APP_ROUTES.login,
    page: Login,
  },
  {
    path: APP_ROUTES.forgot_password,
    page: ForgotPassword,
  },
  {
    path: APP_ROUTES.signup,
    page: Signup,
  },
  {
    path: APP_ROUTES.reset_password,
    page: ResetPassword,
  },
  {
    path: APP_ROUTES.privacy_policy,
    page: PrivacyPolicy,
  },
  {
    path: APP_ROUTES.change_language,
    page: change_language,
  },
  {
    path: APP_ROUTES.desktop_screen,
    page: DesktopScreen,
  },
];
