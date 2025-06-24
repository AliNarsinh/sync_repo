import React from 'react';
import { motion } from 'framer-motion';

const DesktopScreen: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center sm:gap-4 gap-16">
          <div className="text-center">
            <p className="font-inter font-semibold text-base leading-[22.4px] mb-2">
              We are sorry, but your browser isn't supported.
            </p>
            <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
              To enjoy our web application, please use your mobile device.{' '}
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DesktopScreen;
