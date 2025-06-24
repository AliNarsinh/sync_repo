import { FaceSessionOptions, HealthMonitorSession } from './session.types';
export declare class SessionFactory {
    static createFaceSession(licenseKey: any, productId: any, { input, cameraDeviceId, onFaceDetected, processingTime, onVitalSign, onFinalResults, onError, onWarning, onStateChange, orientation, subjectDemographic, strictMeasurementGuidance, onImageData, }: FaceSessionOptions): Promise<HealthMonitorSession>;
    private static createCamera;
}
