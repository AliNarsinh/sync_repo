import { alert } from '@app/assets/images';
import { BarsIcon } from '@app/assets/images/icons';
import { FaCircleExclamationIcon } from '@app/assets/images/icons';
import BlurBackdrop from '@app/components/BackDrop';
import Blood from '@app/components/Blood';
import BottomSheet from '@app/components/BottomSheet';
import WellnessSheet from '@app/components/BottomSheet/WellnessSheet';
import Energy from '@app/components/Energy';
import FightFlight from '@app/components/FightFlight';
import RateVariability from '@app/components/RateVariability';
import SideMenu from '@app/components/SideMenu';
import StressLevel from '@app/components/StressLevel';
import VitalSign from '@app/components/VitalSign';
import HemoglobinA1c from '@app/components/HemoglobinA1c/HemoglobinA1c';
import { useLocalization } from '@app/hooks';
import { getBinah } from '@app/services';
import { checkWellnessLevel } from '@app/utils/emojiCalculation';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@app/constants';
import { getBookMarkByRegion } from '@app/utils/helper';
import Respiration from '@app/components/Respiration';
import Risks from '@app/components/Risks';

const Wellness = () => {
  const { translate } = useLocalization();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [wellnessData, setWellnessData] = useState<any>({
    vitalSign: [],
    risks: [],
    bloodPressure: [],
    stressLevel: [],
    fightFlight: [],
    energyLevel: [],
    rateVariability: [],
    hemoglobinA1c: [],
    respirationData: [],
    userData: [],
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const componentRefs: any = {
    VITAL_SIGNS: useRef(null),
    BLOOD: useRef(null),
    STRESSLEVEL: useRef(null),
    ENERGY: useRef(null),
    RATE_VARIABILITY: useRef(null),
    BLOOD_CHEMISTRY: useRef(null),
    RISKS: useRef(null),
  };

  const scrollToRef = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const controls = useAnimation();
  const { id }: any = useParams();

  const closeBottomSheet = () => {
    controls.start({ y: '100%' });
    setIsBottomSheetOpen(false);
  };

  const openSideBar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      controls.start({ y: 0 });
    } else {
      controls.start({ y: '100%' });
    }
  }, [isBottomSheetOpen, controls]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    scrollToRef(componentRefs[tabName]);
  };

  const tabsArray: string[] = [
    'RISKS',
    'VITAL_SIGNS',
    'BLOOD',
    'STRESSLEVEL',
    'ENERGY',
    'RATE_VARIABILITY',
    'BLOOD_CHEMISTRY',
  ];
  const keysToCheck = ['pulseRate', 'respirationRate', 'prq'];
  const riskKeysToCheck: string[] = [
    'heartAge',
    'ascvdRisk',
    'highBloodPressureRisk',
    'highFastingGlucoseRisk',
    'highHemoglobinA1CRisk',
    'highTotalCholesterolRisk',
    'lowHemoglobinRisk',
  ];
  const bloodKeysToCheck: string[] = ['hypertensionRisk', 'bloodPressure', 'hemoglobin'];
  const stressKeysCheck: string[] = ['stressIndex', 'stressLevel', 'normalizedStressIndex'];
  const energyKeysCheck: string[] = ['pnsZone', 'pnsIndex', 'rmssd', 'sd1', 'meanRri'];
  const fightFlightKeyCHeck: string[] = ['snsIndex', 'snsZone', 'pulseRate', 'stressIndex', 'sd2'];
  const RateVariabilityKeys: string[] = ['sdnn', 'rmssd', 'sd1', 'sd2', 'meanRri', 'lfhf'];
  const hemoglobinA1ckeys: string[] = ['diabetesRisk', 'hemoglobinA1c'];
  const respirationDataKeys: string[] = ['respirationRate'];
  const userDataKeys: string[] = ['gender'];

  useEffect(() => {
    const getBinahData = async () => {
      setLoading(true);
      try {
        const binahData = await getBinah(id);

        if (!binahData?.data?.sessionData) {
          setNotFound(true);
          return;
        }

        const risksData = riskKeysToCheck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const vitalSignData = keysToCheck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const blood = bloodKeysToCheck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const stessLevel = stressKeysCheck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const energyLevel = energyKeysCheck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const fightFlight = fightFlightKeyCHeck.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const rateVariability = RateVariabilityKeys.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const hemoglobinA1c = hemoglobinA1ckeys.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const respirationData = respirationDataKeys.map((key) => {
          return {
            title: key,
            value: binahData?.data?.sessionData[key],
          };
        });

        const userData = userDataKeys.map((key) => {
          return {
            title: key,
            value: binahData?.data?.userId[key],
          };
        });

        setWellnessData({
          vitalSign: vitalSignData,
          risks: risksData,
          bloodPressure: blood,
          stressLevel: stessLevel,
          wellnessLevel: binahData?.data?.sessionData?.wellnessLevel,
          wellnessIndex: binahData?.data?.sessionData?.wellnessIndex,
          energyLevel: energyLevel,
          fightFlight: fightFlight,
          rateVariability: rateVariability,
          hemoglobinA1c: hemoglobinA1c,
          respirationData: respirationData,
          userData: userData,
        });
      } catch (error) {
        console.error('Error fetching binahData:', error);
      } finally {
        setLoading(false);
      }
    };
    getBinahData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBottomSheet = () => {
    setIsBottomSheetOpen(true);
    const obj = {
      title: 'wellnessIndex',
      wellnessLevel: wellnessData?.wellnessLevel?.value,
      wellnessIndex: wellnessData?.wellnessIndex?.value,
    };
    setSelectedData(obj);
  };

  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  const handleRedirect = () => {
    navigate(APP_ROUTES.vital_signs);
  };

  return (
    <>
      {loading ? (
        <div className="bg-custom-gradient  w-full h-screen flex items-center justify-center flex-col">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }}>
            <img src={getBookMarkByRegion()} alt="logomark" className="w-20" />
          </motion.div>
          <h2 className="text-primary-color mt-3 text-lg">{translate('general.loading')}</h2>
        </div>
      ) : (
        <div className="fade-in">
          <section className={`h-full bg-white`}>
            <div className="text-left py-5 cursor-pointer shadow-md ">
              <BarsIcon className="text-lg ml-3" onClick={openSideBar} />
            </div>

            <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 relative">
              {/* Header */}
              <div className="flex flex-col items-center justify-center gap-4 pt-4 mb-6">
                <p className="font-inter font-black text-base leading-[25.2px] text-[#194396]">
                  {checkWellnessLevel(wellnessData?.wellnessLevel?.value, translate)}
                </p>
                <div
                  style={{
                    width: '165px',
                    height: '165px',
                    borderRadius: '50%',
                    border: '13px solid #f2f1f4',
                    position: 'relative',
                    boxShadow: '0px 0px 7px #b3acac',
                  }}
                >
                  <div
                    style={{
                      width: '115px',
                      height: '115px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div style={{ position: 'absolute' }}>
                      <svg style={{ position: 'absolute', right: '0px' }}>
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="10%" style={{ stopOpacity: 1, stopColor: 'red' } as any} />
                            <stop offset="30%" style={{ stopOpacity: 1, stopColor: 'orange' } as any} />
                            <stop offset="60%" style={{ stopOpacity: 1, stopColor: 'yellow' } as any} />
                            <stop offset="80%" style={{ stopOpacity: 1, stopColor: 'green' } as any} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <CircularProgressbar
                      value={wellnessData?.wellnessIndex?.value * 10}
                      text={`${wellnessData?.wellnessIndex?.value ?? translate('not_data.NA')}/10`}
                      strokeWidth={9}
                      circleRatio={0.8}
                      counterClockwise
                      styles={buildStyles({
                        textColor: '#1A4396',
                        pathColor: `url(#gradient)`,
                        rotation: 0.401,
                        trailColor: '#d6d6d6',
                        pathTransitionDuration: 0.5,
                        strokeLinecap: 'rounded',
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center sm:gap-1 gap-1.5 text-center">
                <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />

                <div className="flex items-center justify-start gap-1">
                  <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                    {translate('wellness.title')}
                  </h6>
                  <button onClick={handleBottomSheet}>
                    <img src={alert} alt="info" className="w-5" />
                  </button>
                </div>
                <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey w-9/12">
                  {translate('wellness.desc')}
                </p>
              </div>
              {/* Tabs */}
              <div className="sm:max-w-full max-w-screen-sm mx-auto mt-8 mb-4">
                <div className="flex justify-between items-center hidescrollbar overflow-x-auto whitespace-nowrap sm:gap-0 gap-4">
                  {tabsArray.map((tabName: string) => (
                    <button
                      key={tabName}
                      className={`tab-btn outline-none text-sm leading-5 font-inter ${
                        activeTab === tabName
                          ? 'text-blue-500 underline underline-offset-4 font-bold'
                          : 'text-sm text-[#9E9E9E]'
                      }`}
                      onClick={() => handleTabClick(tabName)}
                    >
                      {translate(`missing_general.top_tabs.${tabName}`)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Tabs Componenets */}

              {notFound ? (
                <div className="h-60 flex items-center justify-center flex-col">
                  <div className="flex items-center justify-center gap-2">
                    <FaCircleExclamationIcon className="text-gray-400 text-2xl" />
                    <h3 className="text-center text-xl font-bold text-primary-color">
                      {translate('not_data.not_found')}
                    </h3>
                  </div>
                </div>
              ) : (
                <>
                  <div ref={componentRefs.RISKS}>
                    <Risks riskData={wellnessData?.risks} />
                  </div>
                  <div ref={componentRefs.VITAL_SIGNS}>
                    <VitalSign vitalData={wellnessData?.vitalSign} />
                  </div>
                  <div ref={componentRefs.BLOOD}>
                    <Blood bloodPressure={wellnessData?.bloodPressure} userData={wellnessData?.userData} />
                  </div>
                  <div ref={componentRefs.BLOOD_CHEMISTRY}>
                    <HemoglobinA1c hemoglobinA1c={wellnessData?.hemoglobinA1c} />
                  </div>
                  <div>
                    <Respiration respirationData={wellnessData?.respirationData} />
                  </div>
                  <div ref={componentRefs.STRESSLEVEL}>
                    <StressLevel stressLevel={wellnessData?.stressLevel} />
                  </div>
                  <div ref={componentRefs.ENERGY}>
                    <Energy energyLevel={wellnessData?.energyLevel} />
                  </div>
                  <div>
                    <FightFlight fightFlight={wellnessData?.fightFlight} />
                  </div>
                  <div ref={componentRefs.RATE_VARIABILITY}>
                    <RateVariability rateVariability={wellnessData?.rateVariability} />
                  </div>
                </>
              )}
              <div className="text-center">
                <button
                  onClick={handleRedirect}
                  className="my-4 px-5 py-2 text-white bg-secondary-color rounded-[9.27px]"
                >
                  {translate('recommand.new_check')}
                </button>
              </div>
            </div>
          </section>
          <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
            <WellnessSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
          </BottomSheet>
          {isSidebarOpen && <SideMenu open={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        </div>
      )}
    </>
  );
};

export default Wellness;
