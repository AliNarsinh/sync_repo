import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useLocalization } from '@app/hooks';
import useAuth from '@app/hooks/useAuth';
import { skinivevalidate, skinivePredict } from '@app/services';
import { APP_ROUTES, LANGUAGE_CONVERT_OBJ } from '@app/constants';
import { useTypedDispatch } from '@app/store';
import { predictSkinive } from '@app/store/actions';
import TryAgain from '@app/components/TryAgain';
import { CheckCameraPermission } from '@app/components/CameraAcess';
import Processing from './processing';
import Navbar from '@app/components/Navbar';
// import { Mask } from '@app/assets/images';

const Component: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { i18n } = useLocalization();
  const { user } = useAuth();
  const { translate } = useLocalization();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef<Webcam | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorSource, setErrorSource] = useState<string>('');
  const [cameraAccessGranted, setCameraAccessGranted] = useState<boolean>(true);

  const handleSubmit = useCallback(
    async (imageSrc: any) => {
      const formData = new FormData();
      formData.append('img', imageSrc);

      try {
        const response = await skinivevalidate(formData);
        if (response?.data?.isgood) {
          const predictResponse = await skinivePredict(
            formData,
            (LANGUAGE_CONVERT_OBJ as any)[(i18n as any)?.resolvedLanguage],
          );
          dispatch(predictSkinive(predictResponse?.data?.sessionData));
          navigate(`${APP_ROUTES.recommand}/${predictResponse?.data?.id}`);
        } else {
          setError(true);
          setErrorSource(response?.data?.source);
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [navigate, dispatch, i18n],
  );

  const capture = useCallback(() => {
    try {
      setLoading(true);
      if (webcamRef.current) {
        const imageSrc: any = webcamRef.current.getScreenshot();

        const byteCharacters = atob(imageSrc.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        const fileName = 'capturedImage.jpeg';
        const imageFile: any = new File([blob], fileName, { type: 'image/jpeg' });
        handleSubmit(imageFile);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  }, [webcamRef, handleSubmit]);

  const handleUserMediaError = useCallback((error: any) => {
    console.error('Error accessing camera:', error);
    // alert(error)
    setCameraAccessGranted(false);
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setLoading(true);
        handleSubmit(selectedFile);
      }
    },
    [handleSubmit],
  );

  return (
    <CheckCameraPermission>
      <Navbar title={translate('measure_skinive_screen.btn_label')} backRoute={APP_ROUTES.calendar} />
      <div className="bg-white" style={{ height: '90vh' }}>
        {error ? (
          <TryAgain
            errorSource={errorSource}
            error={error}
            setError={setError}
            tutorialUrl={APP_ROUTES.tutorial_skinive}
          />
        ) : loading ? (
          <Processing customText={translate('general.loading_desc')} />
        ) : (
          <>
            <section className="p-4">
              <div className=" relative">
                {/* <img src={Mask} className={`absolute w-full h-full z-30 object-cover`} alt="circle" /> */}
                {cameraAccessGranted ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    onUserMediaError={handleUserMediaError}
                    className="w-full object-cover h-auto"
                    videoConstraints={{
                      facingMode: 'environment',
                    }}
                  />
                ) : (
                  <p className="text-center text-red-500 font-bold ">{translate('camera.error_msg')}</p>
                )}
              </div>
              <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center gap-[0px] py-8 py-9">
                <div>
                  <p className="font-inter font-bold text-base leading-[22.4px] text-dark-grey">
                    {user?.firstName || user?.lastName || user?.username},{' '}
                    {translate('measure_skinive_screen.intro_text')}
                  </p>
                  <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
                    {translate('measure_skinive_screen.desc_1')}
                  </p>
                </div>
                <div className="flex flex-col items-center-justify-center gap-3 sm:py-8 pt-5 pb-5 w-full">
                  <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <button
                    type="submit"
                    onClick={capture}
                    className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
                  >
                    {translate('measure_skinive_screen.btn_label')}
                  </button>
                  <button
                    onClick={() => {
                      const input = document.getElementById('fileInput');
                      if (input) {
                        input.click();
                      }
                    }}
                    className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
                  >
                    {translate('measure_skinive_screen.upload_gallery')}
                  </button>{' '}
                </div>
              </div>
            </section>
            {/* <div className="bg-white rounded-tl-[18px] rounded-tr-[18px]  fixed bottom-0 w-full">
         
            </div> */}
          </>
        )}
      </div>
    </CheckCameraPermission>
  );
};

export default Component;
