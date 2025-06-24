import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { clock, mobileFace, mobileBoy, singleMobile } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import Button from '@app/components/Button';
import { APP_ROUTES } from '@app/constants';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLogoByRegion } from '@app/utils/helper';
import Navbar from '@app/components/Navbar';

interface Slide {
  title: string;
  desc: string;
  image: string;
}

const HomePage: React.FC = () => {
  const onHandle = async () => {
    navigate(APP_ROUTES.measure_vitals);
  };
  const { translate } = useLocalization();

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const slides: Slide[] = [
    {
      title: translate('landingPage.slider_intro_1'),
      desc: translate('landingPage.slider_desc_1'),
      image: clock,
    },
    // {
    //   title: translate('landingPage.slider_intro_2'),
    //   desc: translate('landingPage.slider_desc_2'),
    //   image: watch,
    // },
    {
      title: translate('landingPage.slider_intro_3'),
      desc: translate('landingPage.slider_desc_3'),
      image: mobileFace,
    },
    {
      title: translate('landingPage.slider_intro_4'),
      desc: translate('landingPage.slider_desc_4'),
      image: singleMobile,
    },
    {
      title: translate('landingPage.slider_intro_5'),
      desc: translate('landingPage.slider_desc_5'),
      image: mobileBoy,
    },
    // {
    //   title: translate('landingPage.slider_intro_6'),
    //   desc: translate('landingPage.slider_desc_6'),
    //   image: handWatch,
    // },
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
    }, 3000);

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
                <div className="flex flex-col items-center justify-center ">
                  <img src={slides?.[index]?.image} alt={slides?.[index]?.title} className="w-[16rem]	h-[16rem] p-5 " />
                  <div className="carousel-text-container flex flex-col items-center justify-center gap-1">
                    <p className="font-inter text-primary-color leading-[22.4px] font-semibold text-center sm:text-lg text-base">
                      {slides?.[index]?.title}
                    </p>
                    <div className="font-inter text-dark-grey leading-[19.6px] font-normal text-center min-h-32	">
                      {slides?.[index]?.desc}
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
                <Button label={translate('tutorial_screens.measure_now')} onClick={onHandle} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
