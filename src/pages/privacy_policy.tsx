import { notePad } from '@app/assets/images';
import React from 'react';
import { useLocalization } from '@app/hooks';
import { motion } from 'framer-motion';
import Navbar from '@app/components/Navbar';

const PrivacyPolicy: React.FC = () => {
  const { translate } = useLocalization();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <Navbar title={translate('privacy_policy.desc_9')} />
      <section className="bg-custom-gradient flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="flex flex-col items-center justify-center sm:py-10 py-16">
          <img src={notePad} alt="notepad" className="sm: w-[120px]" />
        </div>
      </section>
      <section>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto py-5 sm:px-0 px-3">
          <p className="mb-3 font-inter font-normal leading-5 text-dark-grey -tracking-[0.5px] sm:text-lg text-sm">
            {translate('privacy_policy.desc_1')}
          </p>
          <p className="mb-3 font-inter font-normal leading-5 text-dark-grey -tracking-[0.5px] sm:text-lg text-sm">
            {translate('privacy_policy.desc_2')}
          </p>
          <p className="mb-3 font-inter font-normal leading-5 text-dark-grey -tracking-[0.5px] sm:text-lg text-sm">
            {translate('privacy_policy.desc_3')}
          </p>
          <p className="mb-3 font-inter font-normal leading-5 text-dark-grey -tracking-[0.5px] sm:text-lg text-sm">
            {translate('privacy_policy.desc_4')}
          </p>
          <p className="mb-3 font-inter font-normal leading-5 text-dark-grey -tracking-[0.5px] sm:text-lg text-sm">
            {translate('privacy_policy.desc_5')}
          </p>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:outline-none  focus:border-secondary-color"
            />
            <span className="ml-2 font-inter font-normal sm:text-sm text-xs sm:w-full w-3/5 text-[#010101]">
              {translate('privacy_policy.desc_6')}
              <b>{translate('privacy_policy.desc_7')}</b>
              {translate('privacy_policy.desc_8')}
              <b>{translate('privacy_policy.desc_9')}</b>
            </span>
          </label>
        </div>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
