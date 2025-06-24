import React from 'react';
import { motion } from 'framer-motion';
import { getBookMarkByRegion } from '@app/utils/helper';
const CustomLoader: React.FC = () => {
  return (
    <div className="w-full h-80 flex justify-center items-center flex-col">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }}>
        <img src={getBookMarkByRegion()} alt="logomark" className="w-12" />
      </motion.div>
    </div>
  );
};

export default CustomLoader;
