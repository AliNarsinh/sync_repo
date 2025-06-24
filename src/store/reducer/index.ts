import { combineReducers } from 'redux';
import LanguageReducer from './LanguageReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SkiniveReducer from './SkiniveReducer';
import SkiniveDetailReducer from './SkiniveDetailReducer';

const appReducer = combineReducers({
  lang: LanguageReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  skinive: SkiniveReducer,
  skiniveDetail: SkiniveDetailReducer,
});

export default appReducer;
