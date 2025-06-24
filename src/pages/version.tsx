import { useLocalization } from '@app/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@app/constants';
import { motion } from 'framer-motion';
import Navbar from '@app/components/Navbar';
import { getCompanyName, getLogoByRegion } from '@app/utils/helper';
// import { getLogoByRegion } from '@app/utils/helper';

const Version: React.FC = () => {
  const { translate } = useLocalization();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <Navbar title={translate('version.title')} />
      <section className="bg-custom-gradient flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="flex items-center justify-center sm:py-10 py-16">
          <img src={getLogoByRegion()} alt="logo" className="sm:w-full w-[189.22px]" />
        </div>
      </section>

      <section>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:py-5 sm:px-0 px-3 pt-10 pv-5">
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {translate('version.desc_1')}
          </p>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {getCompanyName()}
          </p>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {`${getCompanyName()} ${translate('version.desc_3')}`}
          </p>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {`${getCompanyName()} ${translate('version.desc_4')}`}
          </p>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {translate('version.desc_5')}
          </p>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {`${translate('version.desc_6_1')} ${getCompanyName()} ${translate('version.desc_6_2')}`}
          </p>
          <Link
            to={APP_ROUTES.privacy_policy}
            className="mb-3 font-inter font-semibold leading-[18px] text-primary-color sm:text-lg text-[13px]"
          >
            {translate('version.desc_7')}
          </Link>
          <p className="mb-3 font-inter font-normal leading-[18px] text-primary-color sm:text-lg text-[13px]">
            {translate('version.desc_8')}
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default Version;
