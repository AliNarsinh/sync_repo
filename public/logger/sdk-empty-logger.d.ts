import { SdkLoggerType } from './logger.types';
import { LogFile, HealthMonitorMessage } from '@binah/wasm';
import { HealthMonitorCodes, VitalSigns } from '../index';
export declare class SdkEmptyLogger implements SdkLoggerType {
    private startDate;
    logError(errorCode: HealthMonitorCodes): void;
    logMessage(messageType: HealthMonitorMessage, message: any): void;
    logReport(report: VitalSigns): void;
    start(): void;
    stop(): LogFile[];
    getFileFormattedDate(): any;
    logWarning(errorCode: HealthMonitorCodes): void;
}
