import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useLocalization } from '@app/hooks';
import Button from '@app/components/Button';
import { handScan, neckScan } from '@app/assets/images';
import { APP_ROUTES } from '@app/constants';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLogoByRegion } from '@app/utils/helper';
import Navbar from '@app/components/Navbar';
// import { getLogoByRegion } from '@app/utils/helper';

interface Slide {
  image: string;
}

const Vitalsigntutorial: React.FC = () => {
  const onHandle = async () => {
    navigate(APP_ROUTES.measure_skin);
  };
  const { translate } = useLocalization();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const slides: Slide[] = [
    {
      image: handScan,
    },
    {
      image: neckScan,
    },
  ];

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const handleSlideChange = (newIndex: number) => {
    setIndex(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      setIndex(nextIndex);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [index, slides.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <Navbar title={translate('tutorial_screens.tutorial')} />
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={getLogoByRegion()} alt="logo" className="sm:w-full w-[250px]" />
        </div>

        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3">
          <div className="flex flex-col items-center-justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
              <animated.div style={props}>
                <div className="flex flex-col items-center justify-center">
                  <img src={slides?.[index]?.image} alt="Lady Work" className="w-[16rem]	h-[16rem] p-5 " />
                  <div className="carousel-text-container flex flex-col items-center justify-center gap-1">
                    <div className="font-inter text-primary-color leading-[22.4px] font-semibold text-center sm:text-lg text-base">
                      {translate('tutorial_screens.self_exam_now')}
                    </div>
                  </div>
                </div>
              </animated.div>
              <div className="flex justify-center mt-2.5">
                {slides?.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2.5 h-2.5 bg-[#ccc] cursor-pointer mx-[5px] my-0 rounded-[50%] border-[none] ${
                      i === index ? 'bg-[rgb(0,83,190)]' : ''
                    }`}
                    onClick={() => handleSlideChange(i)}
                  />
                ))}
              </div>
              <div className="w-full mx-auto py-5">
                <Button label={translate('tutorial_screens.scan_now')} onClick={onHandle} />
              </div>
              <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey text-center">
                {translate('tutorial_screens.info')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Vitalsigntutorial;
