import React, { useEffect, useState } from 'react';
import { useLocalization } from '@app/hooks';
import CalendarComponent from '@app/components/Calander';
import BottomNavigationWrapper from '@app/components/BottomNavigationWrapper';
import { getHistories } from '@app/services/UserHistoryService';
import Loader from '@app/components/Loader';
import { Integrations } from '@app/constants';
import { User } from '@app/store/type';
import BinnaListing from '@app/components/Listing/BinnaListing';
import Listing from '@app/components/Listing';

interface HistoryData {
  _id: string;
  userId: User;
  integration: number;
  companyId?: Record<string, any>;
  sessionData: any;
  createdAt: string;
}

const Calendar: React.FC = () => {
  const { translate } = useLocalization();
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
  );
  const [skiniveData, setSkiniveData] = useState<HistoryData[]>([]);
  const [binnahData, setBinnahData] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getHistories(date);
      if (response?.data?.docs) {
        setSkiniveData(response.data.docs.filter((x: HistoryData) => x?.integration === Integrations.SKINIVE));
        setBinnahData(response.data.docs.filter((x: HistoryData) => x?.integration === Integrations.BINNAH));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <BottomNavigationWrapper>
      <div className="flex items-center justify-center p-10">
        <CalendarComponent setDate={setDate} />
      </div>
      {loading ? (
        <div className="w-full h-screen flex justify-center">
          <Loader />
        </div>
      ) : (
        <div
          className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 flex flex-col gap-0 pb-3"
          style={{
            height: binnahData.length === 0 && skiniveData.length === 0 ? '' : 'calc(100vh - 570px)',
          }}
        >
          <div className="overflow-y-scroll sm:overflow-y-auto sm:pb-0 sm:h-full">
            {binnahData.length === 0 && skiniveData.length === 0 ? (
              <p className="text-center text-gray-500">{translate('measurment.no_measurement')}</p>
            ) : (
              <>
                {binnahData.length > 0 && <BinnaListing binnahListing={binnahData} />}
                {skiniveData.length > 0 && <Listing vitalsData={skiniveData} />}
              </>
            )}
          </div>
        </div>
      )}
    </BottomNavigationWrapper>
  );
};

export default Calendar;
