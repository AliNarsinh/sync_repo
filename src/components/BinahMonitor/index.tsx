import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCameras, useMonitor, useTimer } from '@app/hooks/binah';
import { APP_ROUTES, DEFAULT_MEASUREMENT_DURATION, Integrations } from '@app/constants';
import { SessionState, isIos, isMobile, SmokingStatus } from '@binah/web-sdk';
import { VideoReadyState } from '@app/types/binahTypes';
import Mask from '@app/assets/images/mask.svg';
import measurewave from '@app/assets/images/measurewave.svg';
// import MeasureBinah from '@app/assets/images/measuring-binah.svg';
import { useLocalization } from '@app/hooks';
import useAuth from '@app/hooks/useAuth';
import { postBinahMeasureResults } from '@app/services/UserHistoryService';
import { useNavigate } from 'react-router-dom';
import { ToastType, showToast } from '@app/utils/toastUtils';
import { calculateAge, getBinahGender } from '@app/utils/helper';
import Processing from '@app/pages/processing';
import TryAgain from '../TryAgain';
import LocalProgressBar from '@ramonak/react-progress-bar';
import CustomLoader from '../Loader/CustomLoader';

interface IBinahMonitor {
  showMonitor: boolean;
}

const BinahMonitor = ({ showMonitor }: IBinahMonitor) => {
  const cameras = useCameras();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { translate } = useLocalization();
  const video = useRef(null);
  const [startMeasuring, setStartMeasuring] = useState(false);
  const processingTime = DEFAULT_MEASUREMENT_DURATION;
  const [scanError, setScanError] = useState(false);
  const [cameraId, setCameraId] = useState<string>();

  useEffect(() => {
    if (!cameras?.length) return;
    setCameraId(cameras[0].deviceId);
  }, [cameras]);

  const userAge = calculateAge(Number(user?.birthYear || 18));
  const { sessionState, vitalSigns, session, info, finalData, isFinished, isMonitorReady } = useMonitor(
    video as any,
    cameraId as string,
    processingTime,
    startMeasuring,
    {
      age: userAge,
      weight: user?.weight || 0,
      sex: getBinahGender((user as any)?.gender),
      height: user?.height ? user?.height : 0,
      smokingStatus: user?.smokingStatus ? user?.smokingStatus : SmokingStatus.UNSPECIFIED,
    },
  );

  useEffect(() => {
    if (isFinished && finalData) {
      if (Object.keys(finalData)?.length) {
        console.info('SESSION COMPLETED WITH FINAL DATA', isFinished, JSON.stringify(finalData));
        postBinahMeasureResults(Integrations.BINNAH, finalData)
          .then((response) => {
            session?.terminate();
            navigate(`${APP_ROUTES.wellness}/${response?.data?.id}`);
            showToast(ToastType.Success, translate('toast.vitals_msg'));
          })
          .catch((e) => {
            session?.terminate();
            showToast(ToastType.Error, e.message || e);
            navigate(`${APP_ROUTES.tutorial_binah}`);
          });
      } else {
        console.info('SESSION COMPLETED WITHOUT FINAL DATA', isFinished, finalData, JSON.stringify(finalData));
        setScanError(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, finalData, navigate]);

  const isMeasuring = useCallback(() => sessionState === SessionState.MEASURING, [sessionState]);
  const isVideoReady = useCallback(() => (video as any).current?.readyState === VideoReadyState.HAVE_ENOUGH_DATA, []);

  const secondsCompleted = useTimer(isMeasuring(), processingTime);

  useEffect(() => {
    if (sessionState === SessionState.ACTIVE && !isMeasuring()) {
      setStartMeasuring(false);
    }
  }, [isMeasuring, sessionState]);

  const handleButtonClick = useCallback(() => {
    if (sessionState === SessionState.ACTIVE) {
      console.info('SCAN SESSION STARTED');
      setStartMeasuring(true);
    } else if (isMeasuring()) {
      setStartMeasuring(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionState, processingTime]);

  const handleOnProfileNavigation = () => {
    navigate(APP_ROUTES.profile);
  };

  const handleOnStopScan = () => {
    console.info('SESSION IS TERMINATED BY USER MANUALLY BY PRESSING THE STOP SESSION BUTTON');
    session?.terminate();
    navigate(APP_ROUTES.vital_signs);
  };

  const completePercentage = Number(((secondsCompleted / processingTime) * 100).toFixed(0));

  if (!user?.gender || !user?.weight || !user?.birthYear) {
    return (
      <div className="h-full flex flex-col w-full justify-start items-center flex-1">
        <div className="w-auto h-full flex flex-col justify-start items-center">
          <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] w-full bottom-0">
            <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center gap-[30px] py-8 py-9">
              <div>
                <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey">
                  {user?.username} {translate('measure_binah_screen.update_profile_heading_text')}
                </p>
                <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
                  {translate('measure_binah_screen.update_profile_description')}
                </p>
              </div>
              <button
                onClick={handleOnProfileNavigation}
                className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
              >
                {translate('measure_binah_screen.update_profile_btn_label')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!isMonitorReady || !cameraId) {
    return <Processing customText={translate('general.loading_desc')} />;
  }

  if (scanError) {
    return (
      <TryAgain
        showNav={false}
        error={scanError}
        setError={setScanError}
        redirectUrl={APP_ROUTES.tutorial_binah}
        tutorialUrl={APP_ROUTES.tutorial_binah}
      />
    );
  }
  const getObjectFit = () => (isIos() ? 'unset' : isMobile() ? 'cover' : 'contain');

  return (
    <>
      <div className="h-full flex flex-col w-full justify-start items-center flex-1">
        <div className="w-auto h-full flex flex-col justify-start items-center">
          <div className="relative justify-center w-full">
            <div className="w-full h-full relative">
              <>
                <img src={Mask} className={`absolute w-full h-full z-30 object-cover`} alt="circle" />
                {isMonitorReady && (
                  <video
                    ref={video}
                    id="video"
                    muted={true}
                    playsInline={true}
                    className="camera-transform"
                    style={{
                      width: '100%',
                      height: '27rem',
                      objectFit: getObjectFit(),
                    }}
                  />
                )}
              </>
            </div>
          </div>
          <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] w-full bottom-0">
            <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center gap-[65px] py-8 py-9">
              {!isMeasuring() && !isFinished && (
                <>
                  <div>
                    <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey">
                      {user?.firstName || user?.lastName || user?.username},{' '}
                      {translate('measure_binah_screen.intro_text')}
                    </p>
                    <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
                      {translate('measure_binah_screen.desc_1')}
                    </p>
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
                    disabled={!isVideoReady()}
                  >
                    {translate('measure_binah_screen.btn_label')}
                  </button>
                </>
              )}
              {isMeasuring() && !isFinished && (
                <div>
                  <div className="slider-container w-1/2 h-10vh overflow-hidden relative mx-auto">
                    {vitalSigns?.heartRate?.value && (
                      <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey">
                        {vitalSigns?.heartRate?.value}BPM
                      </p>
                    )}

                    <div className="relative w-80 h-20 mx-auto overflow-hidden">
                      <div
                        className="w-[3400px] min-w-[3400px] h-[30px]  bg-center element-to-animate bg-repeat-x	"
                        style={{ backgroundImage: `url(${measurewave})` }}
                      ></div>
                    </div>
                  </div>
                  {info.message ? (
                    <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey text-red-500">
                      {translate(`measure_binah_screen.during_measure.error`)}
                    </p>
                  ) : (
                    <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey mb-3">
                      {translate(
                        `measure_binah_screen.during_measure.0_${completePercentage - (completePercentage % 10) > 100 ? 100 : completePercentage - (completePercentage % 10)}`,
                      )}
                    </p>
                  )}

                  <LocalProgressBar
                    completed={completePercentage > 100 ? 100 : completePercentage}
                    maxCompleted={100}
                    bgColor="#40DA62"
                    labelSize="12px"
                    baseBgColor="white"
                    className="shadow-[#b6b6b6] shadow-lg"
                  />
                  <p
                    className="font-inter font-bold text-base leading-[22.4px] text-dark-grey mb-3 mt-10 underline"
                    onClick={handleOnStopScan}
                  >
                    {translate('measure_binah_screen.stop_btn_label')}
                  </p>
                </div>
              )}

              {isFinished && (
                <>
                  <CustomLoader />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BinahMonitor;
