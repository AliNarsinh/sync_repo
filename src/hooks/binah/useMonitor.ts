import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import monitor, {
  AlertData,
  DeviceOrientation,
  EnabledVitalSigns,
  FaceSessionOptions,
  HealthMonitorCodes,
  HealthMonitorSession,
  ImageValidity,
  OfflineMeasurements,
  SessionState,
  VitalSigns,
  VitalSignsResults,
  Sex,
} from '@binah/web-sdk';
import { InfoType, InfoData } from '@app/types/binahTypes';
import { BINAH_LIECENSE_KEY } from '@app/constants';

const useMonitor = (
  video: MutableRefObject<HTMLVideoElement>,
  cameraId: string,
  processingTime: number,
  startMeasuring: boolean,
  subjectDemographic: { age: number; weight: number; sex: Sex; height: number; smokingStatus: number },
) => {
  const [session, setSession] = useState<HealthMonitorSession>();
  const [sessionState, setSessionState] = useState<SessionState>();
  const [isMonitorReady, setIsMonitorReady] = useState<boolean>();
  const [isFinished, setIsFinished] = useState<boolean>();
  const [finalData, setFinalData] = useState<VitalSigns | null>();
  const [enabledVitalSigns, setEnabledVitalSigns] = useState<EnabledVitalSigns>();
  const [offlineMeasurements, setOfflineMeasurements] = useState<OfflineMeasurements>();
  const [vitalSigns, setVitalSigns] = useState<VitalSigns | null>();

  const [error, setError] = useState<AlertData>({ code: -1 });
  const [warning, setWarning] = useState<AlertData>({ code: -1 });
  const [info, setInfo] = useState<InfoData>({ type: InfoType.NONE });
  const isDismissing = useRef<boolean>(false);

  const setInfoWithDismiss = useCallback(
    (info: InfoData, seconds?: number) => {
      if (!isDismissing.current) {
        setInfo(info);
        if (seconds) {
          isDismissing.current = true;
          setTimeout(() => {
            setInfo({ type: InfoType.NONE });
            isDismissing.current = false;
          }, seconds * 1000);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [InfoType, setInfo, info, isDismissing, isDismissing.current],
  );

  const updateVitalSigns = useCallback((vitalSigns: any) => {
    setVitalSigns((prev) => ({
      ...prev,
      ...vitalSigns,
    }));
  }, []);

  const onVitalSign = useCallback((vitalSign: VitalSigns) => {
    updateVitalSigns(vitalSign);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinalResults = useCallback((vitalSignsResults: VitalSignsResults) => {
    setIsFinished(true);
    setFinalData(vitalSignsResults.results);
  }, []);

  const onError = (errorData: AlertData) => {
    console.info('RECIEVED ERROR FROM BINAH SDK : ', JSON.stringify(errorData));
    setError(errorData);
  };

  const onWarning = (warningData: AlertData) => {
    console.info('RECIEVED WARNING FROM BINAH SDK : ', JSON.stringify(warningData));
    if (warningData.code === HealthMonitorCodes.MEASUREMENT_CODE_MISDETECTION_DURATION_EXCEEDS_LIMIT_WARNING) {
      setInfo({
        message: `Warning: ${warningData.code}`,
        type: InfoType.INSTRUCTION,
      });
    } else {
      setWarning(warningData);
    }
  };

  const onStateChange = useCallback((state: SessionState) => {
    setSessionState(state);
    if (state === SessionState.MEASURING) {
      setVitalSigns(null);
    }
  }, []);

  const onEnabledVitalSigns = useCallback((vitalSigns: EnabledVitalSigns) => {
    setEnabledVitalSigns(vitalSigns);
  }, []);

  const onOfflineMeasurement = useCallback((offlineMeasurements: OfflineMeasurements) => {
    setOfflineMeasurements(offlineMeasurements);
  }, []);

  const onActivation = useCallback((activationId: string) => {
    // the device has been activated with activationId
  }, []);

  const onImageData = useCallback((imageValidity: ImageValidity) => {
    let message: string;
    if (imageValidity !== ImageValidity.VALID) {
      console.info('RECIEVED IMAGE VALIDITY CALLBACK FROM BINAH SDK : ', JSON.stringify(imageValidity));
      switch (imageValidity) {
        case ImageValidity.INVALID_DEVICE_ORIENTATION:
          message = 'Unsupported Orientation';
          break;
        case ImageValidity.TILTED_HEAD:
          message = 'Head Tilted';
          break;
        case ImageValidity.FACE_TOO_FAR: // Placeholder, currently not supported
          message = 'You Are Too Far';
          break;
        case ImageValidity.UNEVEN_LIGHT:
          message = 'Uneven Lighting';
          break;
        case ImageValidity.INVALID_ROI:
        default:
          message = 'Face Not Detected';
      }
      setInfo({
        type: InfoType.INSTRUCTION,
        message: message,
      });
    } else {
      setInfoWithDismiss({ type: InfoType.NONE });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await monitor.initialize({
          licenseKey: BINAH_LIECENSE_KEY as string,
          licenseInfo: {
            onEnabledVitalSigns,
            onOfflineMeasurement,
            onActivation,
          },
        });
        setIsMonitorReady(true);
        setError({ code: -1 });
      } catch (e: any) {
        console.error('Error initializing HealthMonitor', e);
        setIsMonitorReady(false);
        setError({ code: e?.errorCode });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!isMonitorReady || !processingTime || !video.current || !cameraId || !cameraId?.length) {
          return;
        }
        sessionState === SessionState.ACTIVE && session?.terminate();
        const options: FaceSessionOptions = {
          input: video.current,
          cameraDeviceId: cameraId,
          processingTime,
          onVitalSign,
          onFinalResults,
          onError,
          onWarning,
          onStateChange,
          orientation: DeviceOrientation.PORTRAIT,
          onImageData,
          subjectDemographic,
          userInformation: subjectDemographic,
        };

        const faceSession = await monitor.createFaceSession(options);
        setSession(faceSession);
        setError({ code: -1 });
      } catch (e: any) {
        setError({ code: e?.errorCode });
        console.error('Error creating a session', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processingTime, isMonitorReady, cameraId]);

  useEffect(() => {
    if (startMeasuring) {
      if (sessionState === SessionState.ACTIVE) {
        setIsFinished(false);
        setFinalData(null);
        session?.start();
        setError({ code: -1 });
      }
    } else {
      sessionState === SessionState.MEASURING && session?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startMeasuring]);

  console.log('RETURNING --> ', {
    sessionState,
    isMonitorReady,
    vitalSigns: {
      heartRate: {
        value: vitalSigns?.pulseRate?.value,
        isEnabled: enabledVitalSigns?.isEnabledPulseRate,
      },
      breathingRate: {
        value: vitalSigns?.respirationRate?.value,
        isEnabled: enabledVitalSigns?.isEnabledRespirationRate,
      },
      stress: {
        value: vitalSigns?.stressLevel?.value,
        isEnabled: enabledVitalSigns?.isEnabledStressLevel,
      },
      hrvSdnn: {
        value: vitalSigns?.sdnn?.value,
        isEnabled: enabledVitalSigns?.isEnabledSdnn,
      },
      bloodPressure: {
        value: vitalSigns?.bloodPressure?.value,
        isEnabled: enabledVitalSigns?.isEnabledBloodPressure,
      },
    },
    finalData,
    isFinished,
    offlineMeasurements,
    error,
    warning,
    info,
    session,
  });

  return {
    sessionState,
    isMonitorReady,
    vitalSigns: {
      heartRate: {
        value: vitalSigns?.pulseRate?.value,
        isEnabled: enabledVitalSigns?.isEnabledPulseRate,
      },
      breathingRate: {
        value: vitalSigns?.respirationRate?.value,
        isEnabled: enabledVitalSigns?.isEnabledRespirationRate,
      },
      stress: {
        value: vitalSigns?.stressLevel?.value,
        isEnabled: enabledVitalSigns?.isEnabledStressLevel,
      },
      hrvSdnn: {
        value: vitalSigns?.sdnn?.value,
        isEnabled: enabledVitalSigns?.isEnabledSdnn,
      },
      bloodPressure: {
        value: vitalSigns?.bloodPressure?.value,
        isEnabled: enabledVitalSigns?.isEnabledBloodPressure,
      },
    },
    finalData,
    isFinished,
    offlineMeasurements,
    error,
    warning,
    info,
    session,
  };
};

export default useMonitor;
