import { IStateReducers } from '@app/store/type';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { isAuthenticated, user, token } = useSelector((state: IStateReducers) => state.auth);

  return { isAuthenticated, user, token };
};

export default useAuth;
