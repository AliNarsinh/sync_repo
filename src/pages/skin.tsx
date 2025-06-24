import { leftarrow } from '@app/assets/images';
import { useTypedSelector } from '@app/store';
import { TopnItem } from '@app/store/type';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import StaticScreenComponent from '@app/components/StaticPages/StaticScreenComponent';
import { diseaseMapper, russianDiseasesMapper } from '@app/constants';

const Skin = () => {
  const { desease, class: skinClass } = useTypedSelector((state) => state.skiniveDetail) as TopnItem;
  const navigate = useNavigate();

  // const SelectedComponen = SkinComponentMap[skinClass];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient h-full ">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 relative">
          <div className="cursor-pointer absolute">
            <img src={leftarrow} alt="leftarrow" className="" onClick={handleBack} />
          </div>
          <h1 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">{desease}</h1>
        </div>
        <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] ">
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 flex flex-col gap-0">
            <div className="bg-main-gradient rounded-[15px] sm:h-28 h-[86px] flex justify-center items-center">
              <h6 className="text-white font-inter font-semibold text-[17px] leading-[22px] text-center">{desease}</h6>
            </div>
            <div className="flex items-center justify-center gap-2 pt-4 pb-9">
              <h6 className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-[#646464]">{desease}</h6>
              <h6 className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-[#646464]">{'<'} </h6>
              <h6 className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-black">{skinClass}</h6>
            </div>
            <div>
              {desease && (
                <StaticScreenComponent diseaseName={diseaseMapper[desease] || russianDiseasesMapper[desease]} />
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Skin;
