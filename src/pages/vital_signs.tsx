import React, { useEffect, useState } from 'react';
import { useLocalization } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@app/constants';
import { motion } from 'framer-motion';
import Navbar from '@app/components/Navbar';
import { getEligible } from '@app/services/UserHistoryService';
import { showToast, ToastType } from '@app/utils/toastUtils';
import CustomLoader from '@app/components/Loader/CustomLoader';
// import { getLogoByRegion } from '@app/utils/helper';
import { getLogoByRegion } from '@app/utils/helper';
import { getMe } from '@app/store/actions';
import { useDispatch } from 'react-redux';

const VitalSigns: React.FC = () => {
  const { translate } = useLocalization();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkSkiniveEligible, setCheckSkiniveEligible] = useState<boolean>(false);
  const [skinivemsg, setSkinivemsg] = useState<string>('');
  const [binahmsg, setBinahmsg] = useState<string>('');
  const [checkBinahEligible, setCheckBinahEligible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSkinive = () => {
    if (checkSkiniveEligible) {
      navigate(APP_ROUTES.tutorial_skinive);
    } else {
      showToast(ToastType.Error, skinivemsg);
    }
  };

  const handleVitalSign = () => {
    if (checkBinahEligible) {
      navigate(APP_ROUTES.tutorial_binah);
    } else {
      showToast(ToastType.Error, binahmsg);
    }
  };

  useEffect(() => {
    dispatch(getMe() as any);
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getEligible();

        setCheckSkiniveEligible(res?.data?.skiniveEligibility?.eligible || false);
        setSkinivemsg(res?.data?.skiniveEligibility?.message || '');

        setCheckBinahEligible(res?.data?.binahEligibilty?.eligible || false);
        setBinahmsg(res?.data?.binahEligibilty?.message || '');
      } catch (error) {
        console.error('Error fetching eligibility:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <Navbar title={translate('vital_signs.title')} />
      <section className="bg-custom-gradient h-[350px] flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="flex items-center justify-center">
          <img src={getLogoByRegion()} className="w-[80%]" alt="logo" />
        </div>
      </section>
      {loading ? (
        <CustomLoader />
      ) : (
        <section>
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 relative">
            <div className="flex flex-col items-center-justify-center gap-3 sm:py-8 pt-10 pb-5">
              <h2 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">
                {' '}
                {translate('vital_signs.heading')}
              </h2>
            </div>

            <div className="flex flex-col items-center-justify-center gap-3 sm:py-8 pt-5 pb-5">
              <button
                onClick={() => handleVitalSign()}
                type="submit"
                className={`w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300`}
              >
                {translate('vital_signs.measure_vital_sign')}
              </button>
              <button
                onClick={() => handleSkinive()}
                type="submit"
                className={`w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300`}
              >
                {translate('vital_signs.measure_skin_sign')}
              </button>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default VitalSigns;
