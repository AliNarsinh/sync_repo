import { VitalSigns, VitalSignsResults, AlertData, ImageValidity } from '../common/types';
import { DeviceOrientation } from '../device/types';
export interface OnFaceDetected {
    (isFaceRect: boolean): void;
}
export interface OnImageData {
    (imageValidity: ImageValidity): void;
}
export interface OnVitalSign {
    (VitalSign: VitalSigns): void;
}
export interface OnFinalResults {
    (vitalSignsResults: VitalSignsResults): void;
}
export interface OnError {
    (errorData: AlertData): void;
}
export interface OnWarning {
    (warningData: AlertData): void;
}
export declare type ErrorListener = () => void;
export interface OnStateChange {
    (state: SessionState): void;
}
export declare enum Gender {
    UNSPECIFIED = 0,
    MALE = 1,
    FEMALE = 2
}
export interface SubjectDemographic {
    gender: Gender;
    age: number;
    weight: number;
}
export declare const SUBJECT_DEMOGRAHIC_THRESHOLD: {
    age: {
        min: number;
        max: number;
    };
    weight: {
        min: number;
        max: number;
    };
};
export interface FaceSessionOptions {
    input: HTMLVideoElement;
    cameraDeviceId: string;
    processingTime: number;
    onError?: OnError;
    onWarning?: OnWarning;
    onFaceDetected?: OnFaceDetected;
    onVitalSign?: OnVitalSign;
    onFinalResults?: OnFinalResults;
    onStateChange?: OnStateChange;
    orientation?: DeviceOrientation;
    subjectDemographic?: SubjectDemographic;
    strictMeasurementGuidance?: boolean;
    onImageData?: OnImageData;
}
export interface HealthMonitorSession {
    start(): void;
    stop(): void;
    terminate(): void;
    getState(): SessionState;
    addOnStateChangeListener(onStateChange: OnStateChange): any;
}
export declare enum SessionState {
    INIT = 0,
    ACTIVE = 1,
    MEASURING = 2,
    STOPPING = 3,
    TERMINATED = 4
}
export declare enum HealthMonitorSessionMode {
    FACE_FRONT_CAMERA = 0
}
