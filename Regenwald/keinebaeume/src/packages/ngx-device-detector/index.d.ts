import { ModuleWithProviders } from '@angular/core';
export declare class DeviceDetectorModule {
    static forRoot(): ModuleWithProviders<DeviceDetectorModule>;
}
export { DeviceDetectorService, DeviceInfo } from './device-detector.service';
export { ReTree } from './retree';
export * from './device-detector.constants';
