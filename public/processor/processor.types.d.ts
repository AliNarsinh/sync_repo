import { FrameData } from '../common/types';
import { HealthMonitorSessionMode, OnFaceDetected, OnVitalSign, OnFinalResults, OnError, OnWarning, SubjectDemographic, OnImageData } from '../session/session.types';
import { LogAlgoMeasurements, SdkLoggerType } from '../logger/logger.types';
import { InitLicenseOptions, MonitorFeatures } from '@binah/wasm';
import { DeviceOrientation } from '../device/types';
import { RRILogger } from '../logger/rri-logger';
export declare enum ProcessorState {
    IDLE = 0,
    PROCESSING = 1,
    STOPPING = 2,
    CLOSED = 3
}
export interface HealthMonitorProcessor {
    start(): void;
    stop(withReport: boolean): void;
    close(): void;
    process(frameData: FrameData, invalidOrientation: boolean): void;
    setErrorListener(onError?: () => void): void;
}
export interface ProcessorBuilderOptions {
    mode: HealthMonitorSessionMode;
    onFaceDetected: OnFaceDetected;
    onImageData: OnImageData;
    cameraId: string;
    onVitalSign?: OnVitalSign;
    onFinalResults?: OnFinalResults;
    onError?: OnError;
    onWarning?: OnWarning;
    orientation?: DeviceOrientation;
    subjectDemographic?: SubjectDemographic;
    strictMeasurementGuidance: boolean;
    licenseOptions: InitLicenseOptions;
}
export interface ProcessorOptions {
    onFaceDetected: OnFaceDetected;
    onImageData: OnImageData;
    onVitalSign?: OnVitalSign;
    onFinalResults?: OnFinalResults;
    onError?: OnError;
    onWarning?: OnWarning;
    resolveFeatures: ResolveFeatures;
    logAlgoMeasurements?: LogAlgoMeasurements;
    doLogging?: boolean;
    doPerformance?: boolean;
    doRecording?: boolean;
    doMeasuring?: boolean;
    sdkLogger?: SdkLoggerType;
    rriLogger?: RRILogger;
    requestedOrientation?: DeviceOrientation;
    subjectDemographic?: SubjectDemographic;
    strictMeasurementGuidance: boolean;
    cameraId: string;
    licenseOptions: InitLicenseOptions;
}
export interface ResolveFeatures {
    (measurementTime: number): MonitorFeatures;
}
