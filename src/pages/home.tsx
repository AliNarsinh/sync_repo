import BottomNavigationWrapper from '@app/components/BottomNavigationWrapper';
import CustomTabs from '@app/components/Tabs';
import { Integrations } from '@app/constants';
import { useLocalization } from '@app/hooks';
import useAuth from '@app/hooks/useAuth';
import { getDashboardApi } from '@app/services/DashboardServices';
import { getMe } from '@app/store/actions';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { translate } = useLocalization();
  const [activeTab, setActiveTab] = useState('tab1');
  const [responseData, setResponseData] = useState<any[]>([]);
  const [integrationId, setIntegrationId] = useState<number>(2);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'tab1') {
      setIntegrationId(Integrations.BINNAH);
    } else if (tab === 'tab2') {
      setIntegrationId(Integrations.SKINIVE);
    }
  };

  useEffect(() => {
    const apiCall = async (integrationId: number) => {
      setIsLoader(true);
      try {
        const response = await getDashboardApi(integrationId);
        setResponseData(response?.data?.docs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    };
    apiCall(integrationId);
  }, [integrationId]);

  const getUserName = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName}`;
    } else {
      return `${user?.username}`;
    }
  }, [user]);

  return (
    <BottomNavigationWrapper>
      <div className="py-4 px-3">
        <h2 className="font-inter font-semibold text-xl leading-[28px] text-primary-color">
          {translate('home.intro')} {getUserName}
        </h2>
      </div>
      <CustomTabs
        isLoader={isLoader}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        responseData={responseData}
      />
    </BottomNavigationWrapper>
  );
};

export default Home;
