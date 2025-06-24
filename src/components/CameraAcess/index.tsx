import React, { useState, useEffect, ReactNode } from 'react';
import Processing from '@app/pages/processing';
import { useLocalization } from '@app/hooks';
import { cameraAcess } from '@app/assets/images';
import Navbar from '../Navbar';

const handleClick = () => {
  window.location.reload();
};

const NoCameraPermission = ({ translate }: { translate: (key: string) => string }) => {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-7">
          <img src={cameraAcess} alt="cameraccess" className="sm:w-auto w-[250.22px] h-auto" />
          <div className="font-bold text-md">{translate('camera_permission_screen.camera_permission_title')}</div>{' '}
          <div>{translate('camera_permission_screen.camera_permission_desc1')}</div>
          <div>{translate('camera_permission_screen.camera_permission_desc2')}</div>
          <button
            onClick={handleClick}
            className="w-[270.22px] bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border"
          >
            {translate('camera_permission_screen.try_again')}
          </button>
          <div>{translate('camera_permission_screen.instruction_to_open_camera')}</div>
        </div>
      </section>
    </>
  );
};

const LoadingIndicator = ({ customText = '' }) => {
  return (
    <div>
      <Processing customText={customText} />
    </div>
  );
};

interface CheckCameraPermissionProps {
  children: ReactNode;
}

export const CheckCameraPermission = ({ children }: CheckCameraPermissionProps) => {
  const [isCameraPermission, setCameraPermission] = useState<null | boolean>(null);
  const { translate } = useLocalization();

  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach((track) => track.stop());
          setCameraPermission(true);
        } else {
          setCameraPermission(false);
        }
      } catch (error) {
        console.error('Error checking camera permission:', error);
        setCameraPermission(false);
      }
    };

    checkPermission();
  }, []);

  if (isCameraPermission === null) {
    return <LoadingIndicator customText={translate('general.loading')} />;
  }

  if (isCameraPermission === false) {
    return <NoCameraPermission translate={translate} />;
  }

  return <>{children}</>;
};
