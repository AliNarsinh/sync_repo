import { HealthMonitorCamera, HealthMonitorCameraOptions, HandleFrame } from './camera.types';
export declare class HealthMonitorCameraImpl implements HealthMonitorCamera {
    private readonly frameDimensions;
    private video;
    private stream;
    private deviceId;
    private mediaStreamProvider;
    private frameExtractor;
    constructor({ videoElement, cameraDeviceId, frameDimensions, mediaStreamProvider, frameExtractor, }: HealthMonitorCameraOptions);
    close(): void;
    setFrameHandler(handleFrame: HandleFrame): void;
    open(): Promise<void>;
    resetTime(): void;
    private connectStreamToVideo;
    private startVideo;
}
