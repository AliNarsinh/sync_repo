import React, { useState } from 'react';
import BinahMonitor from '@app/components/BinahMonitor';
import { useDisableZoom } from '@app/hooks/binah';
import UAParser from 'ua-parser-js';
import { CheckCameraPermission } from '@app/components/CameraAcess';
import Navbar from '@app/components/Navbar';
import { useLocalization } from '@app/hooks';
import { APP_ROUTES } from '@app/constants';

const MeasureVirtals = () => {
  const { translate } = useLocalization();
  const [isMobile] = useState(UAParser(navigator.userAgent).device.type === 'mobile');
  useDisableZoom();

  return (
    <CheckCameraPermission>
      <Navbar title={translate('measure_binah_screen.title')} backRoute={APP_ROUTES.calendar} />
      <section className="bg-white p-5 " style={{ height: '90vh' }}>
        <BinahMonitor showMonitor={!isMobile} />
      </section>
    </CheckCameraPermission>
  );
};

export default MeasureVirtals;
