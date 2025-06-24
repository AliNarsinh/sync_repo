import React from 'react';
import { useLocalization } from '@app/hooks';
import { motion } from 'framer-motion';
import { getBookMarkByRegion, getCompanyName } from '@app/utils/helper';

interface ProcessingProps {
  customText?: string;
}

const Processing: React.FC<ProcessingProps> = ({ customText }) => {
  const { translate } = useLocalization();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient h-screen flex items-center justify-center" style={{ height: '90vh' }}>
        <div className="flex flex-col items-center justify-center sm:gap-4 gap-16">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }}>
            <img src={getBookMarkByRegion()} alt="logomark" />
          </motion.div>
          <div className="text-center">
            {customText ? (
              <>
                <h6 className="font-inter font-semibold text-base leading-[22.4px] mb-2">{customText}</h6>
              </>
            ) : (
              <>
                <h6 className="font-inter font-semibold text-base leading-[22.4px] mb-2">
                  {`${getCompanyName()} ${translate('proceesing.title')}`}...
                </h6>
                <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
                  {translate('proceesing.desc')}
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Processing;
