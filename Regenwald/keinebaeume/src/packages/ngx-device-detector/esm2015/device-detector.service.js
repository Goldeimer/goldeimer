import * as tslib_1 from "tslib";
/**
 * Created by ahsanayaz on 08/11/2016.
 */
import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Constants from './device-detector.constants';
import { ReTree } from './retree';
import * as i0 from "@angular/core";
let DeviceDetectorService = class DeviceDetectorService {
    constructor(platformId) {
        this.platformId = platformId;
        this.ua = '';
        this.userAgent = '';
        this.os = '';
        this.browser = '';
        this.device = '';
        this.os_version = '';
        this.browser_version = '';
        this.reTree = new ReTree();
        if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
            this.userAgent = window.navigator.userAgent;
        }
        this.setDeviceInfo(this.userAgent);
    }
    /**
     * @author Ahsan Ayaz
     * @desc Sets the initial value of the device when the service is initiated.
     * This value is later accessible for usage
     */
    setDeviceInfo(ua = this.userAgent) {
        if (ua !== this.userAgent) {
            this.userAgent = ua;
        }
        let mappings = [
            { const: 'OS', prop: 'os' },
            { const: 'BROWSERS', prop: 'browser' },
            { const: 'DEVICES', prop: 'device' },
            { const: 'OS_VERSIONS', prop: 'os_version' },
        ];
        mappings.forEach(mapping => {
            this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce((obj, item) => {
                if (Constants[mapping.const][item] === 'device') {
                    // hack for iOS 13 Tablet
                    if (isPlatformBrowser(this.platformId) &&
                        (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE['iPad']) ||
                            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
                        obj[Constants[mapping.const][item]] = 'iPad';
                        return Object;
                    }
                }
                obj[Constants[mapping.const][item]] = this.reTree.test(ua, Constants[`${mapping.const}_RE`][item]);
                return obj;
            }, {});
        });
        mappings.forEach(mapping => {
            this[mapping.prop] = Object.keys(Constants[mapping.const])
                .map(key => {
                return Constants[mapping.const][key];
            })
                .reduce((previousValue, currentValue) => {
                if (mapping.prop === 'device' && previousValue === Constants[mapping.const].ANDROID) {
                    // if we have the actual device found, instead of 'Android', return the actual device
                    return this[mapping.prop][currentValue] ? currentValue : previousValue;
                }
                else {
                    return previousValue === Constants[mapping.const].UNKNOWN && this[mapping.prop][currentValue]
                        ? currentValue
                        : previousValue;
                }
            }, Constants[mapping.const].UNKNOWN);
        });
        this.browser_version = '0';
        if (this.browser !== Constants.BROWSERS.UNKNOWN) {
            let re = Constants.BROWSER_VERSIONS_RE[this.browser];
            let res = this.reTree.exec(ua, re);
            if (!!res) {
                this.browser_version = res[1];
            }
        }
    }
    /**
     * @author Ahsan Ayaz
     * @desc Returns the device information
     * @returns the device information object.
     */
    getDeviceInfo() {
        const deviceInfo = {
            userAgent: this.userAgent,
            os: this.os,
            browser: this.browser,
            device: this.device,
            os_version: this.os_version,
            browser_version: this.browser_version,
        };
        return deviceInfo;
    }
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the mobile devices to check
     * if the current device is a mobile and also check current device is tablet so it will return false.
     * @returns whether the current device is a mobile
     */
    isMobile(userAgent = this.userAgent) {
        if (this.isTablet(userAgent)) {
            return false;
        }
        const match = Object.keys(Constants.MOBILES_RE).find(mobile => {
            return this.reTree.test(userAgent, Constants.MOBILES_RE[mobile]);
        });
        return !!match;
    }
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the tablet devices to check
     * if the current device is a tablet.
     * @returns whether the current device is a tablet
     */
    isTablet(userAgent = this.userAgent) {
        if (isPlatformBrowser(this.platformId) &&
            (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE['iPad']) ||
                (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
            return true;
        }
        const match = Object.keys(Constants.TABLETS_RE).find(mobile => {
            return !!this.reTree.test(userAgent, Constants.TABLETS_RE[mobile]);
        });
        return !!match;
    }
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the desktop devices to check
     * if the current device is a desktop device.
     * @returns whether the current device is a desktop device
     */
    isDesktop(userAgent = this.userAgent) {
        const desktopDevices = [Constants.DEVICES.PS4, Constants.DEVICES.CHROME_BOOK, Constants.DEVICES.UNKNOWN];
        if (this.device === Constants.DEVICES.UNKNOWN) {
            if (this.isMobile(userAgent) || this.isTablet(userAgent)) {
                return false;
            }
        }
        return desktopDevices.indexOf(this.device) > -1;
    }
};
DeviceDetectorService.ngInjectableDef = i0.defineInjectable({ factory: function DeviceDetectorService_Factory() { return new DeviceDetectorService(i0.inject(i0.PLATFORM_ID)); }, token: DeviceDetectorService, providedIn: "root" });
DeviceDetectorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    }),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DeviceDetectorService);
export { DeviceDetectorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWRldGVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGV2aWNlLWRldGVjdG9yLyIsInNvdXJjZXMiOlsiZGV2aWNlLWRldGVjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHO0FBQ0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ25ELE9BQU8sS0FBSyxTQUFTLE1BQU0sNkJBQTZCLENBQUE7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTs7QUFjakMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFVaEMsWUFBeUMsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7UUFUeEQsT0FBRSxHQUFHLEVBQUUsQ0FBQTtRQUNQLGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxPQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1AsWUFBTyxHQUFHLEVBQUUsQ0FBQTtRQUNaLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFDWCxlQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ2Ysb0JBQWUsR0FBRyxFQUFFLENBQUE7UUFDcEIsV0FBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7UUFHbkIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUE7U0FDNUM7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGFBQWEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDL0IsSUFB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QUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hHLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxLQUFLLENBQUE7YUFDYjtTQUNGO1FBQ0QsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0NBQ0YsQ0FBQTs7QUFsSlkscUJBQXFCO0lBSGpDLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7SUFXYSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7O0dBVnJCLHFCQUFxQixDQWtKakM7U0FsSlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGFoc2FuYXlheiBvbiAwOC8xMS8yMDE2LlxuICovXG5pbXBvcnQgeyBQTEFURk9STV9JRCwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gJy4vZGV2aWNlLWRldGVjdG9yLmNvbnN0YW50cydcbmltcG9ydCB7IFJlVHJlZSB9IGZyb20gJy4vcmV0cmVlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERldmljZUluZm8ge1xuICB1c2VyQWdlbnQ6IHN0cmluZ1xuICBvczogc3RyaW5nXG4gIGJyb3dzZXI6IHN0cmluZ1xuICBkZXZpY2U6IHN0cmluZ1xuICBvc192ZXJzaW9uOiBzdHJpbmdcbiAgYnJvd3Nlcl92ZXJzaW9uOiBzdHJpbmdcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERldmljZURldGVjdG9yU2VydmljZSB7XG4gIHVhID0gJydcbiAgdXNlckFnZW50ID0gJydcbiAgb3MgPSAnJ1xuICBicm93c2VyID0gJydcbiAgZGV2aWNlID0gJydcbiAgb3NfdmVyc2lvbiA9ICcnXG4gIGJyb3dzZXJfdmVyc2lvbiA9ICcnXG4gIHJlVHJlZSA9IG5ldyBSZVRyZWUoKVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMudXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcbiAgICB9XG4gICAgdGhpcy5zZXREZXZpY2VJbmZvKHRoaXMudXNlckFnZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBAZGVzYyBTZXRzIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBkZXZpY2Ugd2hlbiB0aGUgc2VydmljZSBpcyBpbml0aWF0ZWQuXG4gICAqIFRoaXMgdmFsdWUgaXMgbGF0ZXIgYWNjZXNzaWJsZSBmb3IgdXNhZ2VcbiAgICovXG4gIHNldERldmljZUluZm8odWEgPSB0aGlzLnVzZXJBZ2VudCkge1xuICAgIGlmICh1YSAhPT0gdGhpcy51c2VyQWdlbnQpIHtcbiAgICAgIHRoaXMudXNlckFnZW50ID0gdWFcbiAgICB9XG4gICAgbGV0IG1hcHBpbmdzID0gW1xuICAgICAgeyBjb25zdDogJ09TJywgcHJvcDogJ29zJyB9LFxuICAgICAgeyBjb25zdDogJ0JST1dTRVJTJywgcHJvcDogJ2Jyb3dzZXInIH0sXG4gICAgICB7IGNvbnN0OiAnREVWSUNFUycsIHByb3A6ICdkZXZpY2UnIH0sXG4gICAgICB7IGNvbnN0OiAnT1NfVkVSU0lPTlMnLCBwcm9wOiAnb3NfdmVyc2lvbicgfSxcbiAgICBdXG5cbiAgICBtYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xuICAgICAgdGhpc1ttYXBwaW5nLnByb3BdID0gT2JqZWN0LmtleXMoQ29uc3RhbnRzW21hcHBpbmcuY29uc3RdKS5yZWR1Y2UoKG9iajogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKENvbnN0YW50c1ttYXBwaW5nLmNvbnN0XVtpdGVtXSA9PT0gJ2RldmljZScpIHtcbiAgICAgICAgICAvLyBoYWNrIGZvciBpT1MgMTMgVGFibGV0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJlxuICAgICAgICAgICAgKCEhdGhpcy5yZVRyZWUudGVzdCh0aGlzLnVzZXJBZ2VudCwgQ29uc3RhbnRzLlRBQkxFVFNfUkVbJ2lQYWQnXSkgfHxcbiAgICAgICAgICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG9ialtDb25zdGFudHNbbWFwcGluZy5jb25zdF1baXRlbV1dID0gJ2lQYWQnXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9ialtDb25zdGFudHNbbWFwcGluZy5jb25zdF1baXRlbV1dID0gdGhpcy5yZVRyZWUudGVzdCh1YSwgQ29uc3RhbnRzW2Ake21hcHBpbmcuY29uc3R9X1JFYF1baXRlbV0pXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sIHt9KVxuICAgIH0pXG5cbiAgICBtYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xuICAgICAgdGhpc1ttYXBwaW5nLnByb3BdID0gT2JqZWN0LmtleXMoQ29uc3RhbnRzW21hcHBpbmcuY29uc3RdKVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIENvbnN0YW50c1ttYXBwaW5nLmNvbnN0XVtrZXldXG4gICAgICAgIH0pXG4gICAgICAgIC5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgIGlmIChtYXBwaW5nLnByb3AgPT09ICdkZXZpY2UnICYmIHByZXZpb3VzVmFsdWUgPT09IENvbnN0YW50c1ttYXBwaW5nLmNvbnN0XS5BTkRST0lEKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIHRoZSBhY3R1YWwgZGV2aWNlIGZvdW5kLCBpbnN0ZWFkIG9mICdBbmRyb2lkJywgcmV0dXJuIHRoZSBhY3R1YWwgZGV2aWNlXG4gICAgICAgICAgICByZXR1cm4gdGhpc1ttYXBwaW5nLnByb3BdW2N1cnJlbnRWYWx1ZV0gPyBjdXJyZW50VmFsdWUgOiBwcmV2aW91c1ZhbHVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlID09PSBDb25zdGFudHNbbWFwcGluZy5jb25zdF0uVU5LTk9XTiAmJiB0aGlzW21hcHBpbmcucHJvcF1bY3VycmVudFZhbHVlXVxuICAgICAgICAgICAgICA/IGN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgICA6IHByZXZpb3VzVmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sIENvbnN0YW50c1ttYXBwaW5nLmNvbnN0XS5VTktOT1dOKVxuICAgIH0pXG5cbiAgICB0aGlzLmJyb3dzZXJfdmVyc2lvbiA9ICcwJ1xuICAgIGlmICh0aGlzLmJyb3dzZXIgIT09IENvbnN0YW50cy5CUk9XU0VSUy5VTktOT1dOKSB7XG4gICAgICBsZXQgcmUgPSBDb25zdGFudHMuQlJPV1NFUl9WRVJTSU9OU19SRVt0aGlzLmJyb3dzZXJdXG4gICAgICBsZXQgcmVzID0gdGhpcy5yZVRyZWUuZXhlYyh1YSwgcmUpXG4gICAgICBpZiAoISFyZXMpIHtcbiAgICAgICAgdGhpcy5icm93c2VyX3ZlcnNpb24gPSByZXNbMV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGF1dGhvciBBaHNhbiBBeWF6XG4gICAqIEBkZXNjIFJldHVybnMgdGhlIGRldmljZSBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJucyB0aGUgZGV2aWNlIGluZm9ybWF0aW9uIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBnZXREZXZpY2VJbmZvKCk6IERldmljZUluZm8ge1xuICAgIGNvbnN0IGRldmljZUluZm86IERldmljZUluZm8gPSB7XG4gICAgICB1c2VyQWdlbnQ6IHRoaXMudXNlckFnZW50LFxuICAgICAgb3M6IHRoaXMub3MsXG4gICAgICBicm93c2VyOiB0aGlzLmJyb3dzZXIsXG4gICAgICBkZXZpY2U6IHRoaXMuZGV2aWNlLFxuICAgICAgb3NfdmVyc2lvbjogdGhpcy5vc192ZXJzaW9uLFxuICAgICAgYnJvd3Nlcl92ZXJzaW9uOiB0aGlzLmJyb3dzZXJfdmVyc2lvbixcbiAgICB9XG4gICAgcmV0dXJuIGRldmljZUluZm9cbiAgfVxuXG4gIC8qKlxuICAgKiBAYXV0aG9yIEFoc2FuIEF5YXpcbiAgICogQGRlc2MgQ29tcGFyZXMgdGhlIGN1cnJlbnQgZGV2aWNlIGluZm8gd2l0aCB0aGUgbW9iaWxlIGRldmljZXMgdG8gY2hlY2tcbiAgICogaWYgdGhlIGN1cnJlbnQgZGV2aWNlIGlzIGEgbW9iaWxlIGFuZCBhbHNvIGNoZWNrIGN1cnJlbnQgZGV2aWNlIGlzIHRhYmxldCBzbyBpdCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICogQHJldHVybnMgd2hldGhlciB0aGUgY3VycmVudCBkZXZpY2UgaXMgYSBtb2JpbGVcbiAgICovXG4gIHB1YmxpYyBpc01vYmlsZSh1c2VyQWdlbnQgPSB0aGlzLnVzZXJBZ2VudCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzVGFibGV0KHVzZXJBZ2VudCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb25zdCBtYXRjaCA9IE9iamVjdC5rZXlzKENvbnN0YW50cy5NT0JJTEVTX1JFKS5maW5kKG1vYmlsZSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yZVRyZWUudGVzdCh1c2VyQWdlbnQsIENvbnN0YW50cy5NT0JJTEVTX1JFW21vYmlsZV0pXG4gICAgfSlcbiAgICByZXR1cm4gISFtYXRjaFxuICB9XG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBAZGVzYyBDb21wYXJlcyB0aGUgY3VycmVudCBkZXZpY2UgaW5mbyB3aXRoIHRoZSB0YWJsZXQgZGV2aWNlcyB0byBjaGVja1xuICAgKiBpZiB0aGUgY3VycmVudCBkZXZpY2UgaXMgYSB0YWJsZXQuXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgZGV2aWNlIGlzIGEgdGFibGV0XG4gICAqL1xuICBwdWJsaWMgaXNUYWJsZXQodXNlckFnZW50ID0gdGhpcy51c2VyQWdlbnQpIHtcbiAgICBpZiAoXG4gICAgICBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmXG4gICAgICAoISF0aGlzLnJlVHJlZS50ZXN0KHRoaXMudXNlckFnZW50LCBDb25zdGFudHMuVEFCTEVUU19SRVsnaVBhZCddKSB8fFxuICAgICAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEpKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgY29uc3QgbWF0Y2ggPSBPYmplY3Qua2V5cyhDb25zdGFudHMuVEFCTEVUU19SRSkuZmluZChtb2JpbGUgPT4ge1xuICAgICAgcmV0dXJuICEhdGhpcy5yZVRyZWUudGVzdCh1c2VyQWdlbnQsIENvbnN0YW50cy5UQUJMRVRTX1JFW21vYmlsZV0pXG4gICAgfSlcbiAgICByZXR1cm4gISFtYXRjaFxuICB9XG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBAZGVzYyBDb21wYXJlcyB0aGUgY3VycmVudCBkZXZpY2UgaW5mbyB3aXRoIHRoZSBkZXNrdG9wIGRldmljZXMgdG8gY2hlY2tcbiAgICogaWYgdGhlIGN1cnJlbnQgZGV2aWNlIGlzIGEgZGVza3RvcCBkZXZpY2UuXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgZGV2aWNlIGlzIGEgZGVza3RvcCBkZXZpY2VcbiAgICovXG4gIHB1YmxpYyBpc0Rlc2t0b3AodXNlckFnZW50ID0gdGhpcy51c2VyQWdlbnQpIHtcbiAgICBjb25zdCBkZXNrdG9wRGV2aWNlcyA9IFtDb25zdGFudHMuREVWSUNFUy5QUzQsIENvbnN0YW50cy5ERVZJQ0VTLkNIUk9NRV9CT09LLCBDb25zdGFudHMuREVWSUNFUy5VTktOT1dOXVxuICAgIGlmICh0aGlzLmRldmljZSA9PT0gQ29uc3RhbnRzLkRFVklDRVMuVU5LTk9XTikge1xuICAgICAgaWYgKHRoaXMuaXNNb2JpbGUodXNlckFnZW50KSB8fCB0aGlzLmlzVGFibGV0KHVzZXJBZ2VudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXNrdG9wRGV2aWNlcy5pbmRleE9mKHRoaXMuZGV2aWNlKSA+IC0xXG4gIH1cbn1cbiJdfQ==