import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { InventoryService } from '@c8y/client';
export class GpKpiOverviewWidgetService {
    constructor(inventory) {
        this.inventory = inventory;
    }
    getDevicesAvailability(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalDevices = 0;
            let availableDevices = 0;
            let unavailableDevices = 0;
            let response = null;
            const inventory = yield this.inventory.detail(deviceId);
            response = inventory.data;
            if (response.hasOwnProperty('c8y_IsDevice')) {
                totalDevices = 1;
                if (response.childDevices.references.length > 0) {
                    let available = false;
                    const promises = response.childDevices.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                        const childInventory = yield this.inventory.detail(childDevice.managedObject.id);
                        const childDeviceData = childInventory.data;
                        if (childDeviceData.hasOwnProperty('c8y_Availability')) {
                            if (childDeviceData.c8y_Availability.status === 'AVAILABLE') {
                                available = true;
                            }
                            else {
                                available = false;
                            }
                        }
                    }));
                    if (available) {
                        if (response.hasOwnProperty('c8y_Availability')) {
                            if (response.c8y_Availability.status === 'AVAILABLE') {
                                availableDevices = 1;
                            }
                            else {
                                unavailableDevices = 1;
                            }
                        }
                        else {
                            availableDevices = 1;
                        }
                    }
                    else {
                        unavailableDevices = 1;
                    }
                    yield Promise.all(promises);
                }
                else {
                    if (response.hasOwnProperty('c8y_Availability') && (response.c8y_Availability.status === 'AVAILABLE')) {
                        availableDevices = 1;
                    }
                    else {
                        unavailableDevices = 1;
                    }
                }
            }
            else {
                if (response.childAssets.references.length > 0) {
                    const promises = response.childAssets.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                        const ChildInventory = yield this.inventory.detail(childDevice.managedObject.id);
                        const childDeviceData = ChildInventory.data;
                        if (childDeviceData.hasOwnProperty('c8y_Availability')) {
                            if (childDeviceData.c8y_Availability.status === 'AVAILABLE') {
                                availableDevices += 1;
                            }
                            else {
                                unavailableDevices += 1;
                            }
                        }
                        else if (childDeviceData.hasOwnProperty('c8y_IsAsset')) {
                            let available = false;
                            if (childDeviceData.childAssets.references.length > 0) {
                                const promises1 = childDeviceData.childAssets.references.map((assetChildDevice) => __awaiter(this, void 0, void 0, function* () {
                                    const assetChildInventory = yield this.inventory.detail(assetChildDevice.managedObject.id);
                                    const assetChildDeviceData = assetChildInventory.data;
                                    if (assetChildDeviceData.hasOwnProperty('c8y_Availability')) {
                                        if (assetChildDeviceData.c8y_Availability.status === 'AVAILABLE') {
                                            available = true;
                                        }
                                        else {
                                            available = false;
                                        }
                                    }
                                    else {
                                        available = false;
                                    }
                                }));
                                yield Promise.all(promises1);
                            }
                            if (available) {
                                availableDevices += 1;
                            }
                            else {
                                unavailableDevices += 1;
                            }
                        }
                    }));
                    yield Promise.all(promises);
                }
                totalDevices = inventory.data.childAssets.references.length;
            }
            return { totalDevices, availableDevices, unavailableDevices };
        });
    }
    getFirmwareRisks(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let highRiskCount = 0;
            let mediumRiskCount = 0;
            let lowRiskCount = 0;
            let noRiskCount = 0;
            const firmwareData = yield this.inventory.list({ type: 'sag_racm_currentFirmware' });
            if (firmwareData.data.length > 0) {
                this.latestFirmwareVersion = firmwareData.data[0].firmware.version;
            }
            let response = null;
            const inventory = yield this.inventory.detail(deviceId);
            response = inventory.data;
            if (response.hasOwnProperty('c8y_IsDevice')) {
                const risks = this.calculateRiskCount(response);
                highRiskCount = risks.highRisk;
                mediumRiskCount = risks.mediumRisk;
                lowRiskCount = risks.lowRisk;
                noRiskCount = risks.noRisk;
            }
            else if (response.childAssets.references.length > 0) {
                const promises = response.childAssets.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                    const childInventory = yield this.inventory.detail(childDevice.managedObject.id);
                    const childDeviceData = childInventory.data;
                    if (childDeviceData.hasOwnProperty('c8y_IsDevice')) {
                        const risks = this.calculateRiskCount(response);
                        highRiskCount = risks.highRisk;
                        mediumRiskCount = risks.mediumRisk;
                        lowRiskCount = risks.lowRisk;
                        noRiskCount = risks.noRisk;
                    }
                    else if (childDeviceData.hasOwnProperty('c8y_IsAsset')) {
                        if (childDeviceData.childAssets.references.length > 0) {
                            const promises1 = childDeviceData.childAssets.references.map((assetChildDevice) => __awaiter(this, void 0, void 0, function* () {
                                const assetChildInventory = yield this.inventory.detail(assetChildDevice.managedObject.id);
                                const assetChildDeviceData = assetChildInventory.data;
                                if (assetChildDeviceData.hasOwnProperty('c8y_IsDevice')) {
                                    const risks = this.calculateRiskCount(response);
                                    highRiskCount = risks.highRisk;
                                    mediumRiskCount = risks.mediumRisk;
                                    lowRiskCount = risks.lowRisk;
                                    noRiskCount = risks.noRisk;
                                }
                            }));
                            yield Promise.all(promises1);
                        }
                    }
                }));
                yield Promise.all(promises);
            }
            return { highRiskCount, mediumRiskCount, lowRiskCount, noRiskCount };
        });
    }
    calculateRiskCount(device) {
        let atRisk = false;
        let noRisk = 0;
        let lowRisk = 0;
        let mediumRisk = 0;
        let highRisk = 0;
        if (device) {
            const firmwareStatus = device.c8y_Firmware;
            let versionIssues = 0;
            if (firmwareStatus && firmwareStatus.version) {
                versionIssues = firmwareStatus.version - this.latestFirmwareVersion;
            }
            if (versionIssues <= 0) {
                atRisk = true;
            }
            if (atRisk) {
                if (atRisk) {
                    if (versionIssues >= 0) {
                        noRisk += 1;
                    }
                    else if (versionIssues === -1) {
                        lowRisk += 1;
                    }
                    else if (versionIssues === -2) {
                        mediumRisk += 1;
                    }
                    else if (versionIssues <= -3) {
                        highRisk += 1;
                    }
                }
            }
        }
        return { noRisk, lowRisk, mediumRisk, highRisk };
    }
    getAlarms(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalAlarms = 0;
            let majorAlertsCount = 0;
            let minorAlertsCount = 0;
            let criticalAlertsCount = 0;
            let response = null;
            const inventory = yield this.inventory.detail(deviceId);
            response = inventory.data;
            if (response.hasOwnProperty('c8y_IsDevice')) {
                const alerts = this.calculateAlarmsCount(response);
                minorAlertsCount = alerts.minorAlerts;
                majorAlertsCount = alerts.majorAlerts;
                criticalAlertsCount = alerts.criticalAlerts;
            }
            else if (response.childAssets.references.length > 0) {
                const promises = response.childAssets.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                    const childInventory = yield this.inventory.detail(childDevice.managedObject.id);
                    const childDeviceData = childInventory.data;
                    if (childDeviceData.hasOwnProperty('c8y_IsDevice')) {
                        const alerts = this.calculateAlarmsCount(childDeviceData);
                        minorAlertsCount = alerts.minorAlerts;
                        majorAlertsCount = alerts.majorAlerts;
                        criticalAlertsCount = alerts.criticalAlerts;
                    }
                    else if (childDeviceData.hasOwnProperty('c8y_IsAsset')) {
                        if (childDeviceData.childAssets.references.length > 0) {
                            const promises1 = childDeviceData.childAssets.references.map((assetChildDevice) => __awaiter(this, void 0, void 0, function* () {
                                const assetChildInventory = yield this.inventory.detail(assetChildDevice.managedObject.id);
                                const assetChildDeviceData = assetChildInventory.data;
                                if (assetChildDeviceData.hasOwnProperty('c8y_IsDevice')) {
                                    const alerts = this.calculateAlarmsCount(assetChildDeviceData);
                                    minorAlertsCount = alerts.minorAlerts;
                                    majorAlertsCount = alerts.majorAlerts;
                                    criticalAlertsCount = alerts.criticalAlerts;
                                }
                            }));
                            yield Promise.all(promises1);
                        }
                    }
                }));
                yield Promise.all(promises);
            }
            totalAlarms = majorAlertsCount + minorAlertsCount + criticalAlertsCount;
            return { totalAlarms, majorAlertsCount, minorAlertsCount, criticalAlertsCount };
        });
    }
    calculateAlarmsCount(device) {
        let minorAlerts = 0;
        let majorAlerts = 0;
        let criticalAlerts = 0;
        const activeAlerts = device.c8y_ActiveAlarmsStatus;
        if (activeAlerts !== undefined) {
            if (activeAlerts.hasOwnProperty('minor')) {
                if (activeAlerts.minor > 0) {
                    minorAlerts += device.c8y_ActiveAlarmsStatus.minor;
                }
            }
            if (activeAlerts.hasOwnProperty('major')) {
                if (activeAlerts.major > 0) {
                    majorAlerts += device.c8y_ActiveAlarmsStatus.major;
                }
            }
            if (activeAlerts.hasOwnProperty('critical')) {
                if (activeAlerts.critical > 0) {
                    criticalAlerts += device.c8y_ActiveAlarmsStatus.critical;
                }
            }
        }
        return { minorAlerts, majorAlerts, criticalAlerts };
    }
    getNewKPICount(deviceId, newKPI) {
        return __awaiter(this, void 0, void 0, function* () {
            let newKPICount = 0;
            let response = null;
            const inventory = yield this.inventory.detail(deviceId);
            response = inventory.data;
            if (response.hasOwnProperty('c8y_IsDevice') && response.hasOwnProperty(newKPI)) {
                newKPICount = 1;
            }
            else if (response.childAssets.references.length > 0) {
                const promises = response.childAssets.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                    const childInventory = yield this.inventory.detail(childDevice.managedObject.id);
                    const childDeviceData = childInventory.data;
                    if (childDeviceData.hasOwnProperty(newKPI)) {
                        newKPICount += 1;
                    }
                    else if (childDeviceData.hasOwnProperty('c8y_IsAsset')) {
                        if (childDeviceData.childAssets.references.length > 0) {
                            const promises1 = childDeviceData.childAssets.references.map((assetChildDevice) => __awaiter(this, void 0, void 0, function* () {
                                const assetChildInventory = yield this.inventory.detail(assetChildDevice.managedObject.id);
                                const assetChildDeviceData = assetChildInventory.data;
                                if (assetChildDeviceData.hasOwnProperty(newKPI)) {
                                    newKPICount += 1;
                                }
                            }));
                            yield Promise.all(promises1);
                        }
                    }
                }));
                yield Promise.all(promises);
            }
            else {
                newKPICount = 0;
            }
            return newKPICount;
        });
    }
    getNewKPIValue(deviceId, newKPI) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = null;
            let newKPIValue;
            const inventory = yield this.inventory.detail(deviceId);
            response = inventory.data;
            if (response.hasOwnProperty('c8y_IsDevice') && response.hasOwnProperty(newKPI)) {
                newKPIValue = response[newKPI];
            }
            else if (response.childAssets.references.length > 0) {
                const promises = response.childAssets.references.map((childDevice) => __awaiter(this, void 0, void 0, function* () {
                    const childInventory = yield this.inventory.detail(childDevice.managedObject.id);
                    const childDeviceData = childInventory.data;
                    if (childDeviceData.hasOwnProperty(newKPI)) {
                        newKPIValue += response[newKPI];
                    }
                    else if (childDeviceData.hasOwnProperty('c8y_IsAsset')) {
                        if (childDeviceData.childAssets.references.length > 0) {
                            const promises1 = childDeviceData.childAssets.references.map((assetChildDevice) => __awaiter(this, void 0, void 0, function* () {
                                const assetChildInventory = yield this.inventory.detail(assetChildDevice.managedObject.id);
                                const assetChildDeviceData = assetChildInventory.data;
                                if (assetChildDeviceData.hasOwnProperty(newKPI)) {
                                    newKPIValue += response[newKPI];
                                }
                            }));
                            yield Promise.all(promises1);
                        }
                    }
                }));
                yield Promise.all(promises);
            }
            else {
                newKPIValue = '';
            }
            return newKPIValue;
        });
    }
}
GpKpiOverviewWidgetService.decorators = [
    { type: Injectable }
];
GpKpiOverviewWidgetService.ctorParameters = () => [
    { type: InventoryService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC9zcmMvbGliL2dwLWtwaS1vdmVydmlldy13aWRnZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBa0JBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSS9DLE1BQU0sT0FBTywwQkFBMEI7SUFJckMsWUFBbUIsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDOUMsQ0FBQztJQUVLLHNCQUFzQixDQUFDLFFBQVE7O1lBQ25DLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUM7WUFDekIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RCxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzNDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBRWpCLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFFL0MsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN0QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxXQUFXLEVBQUUsRUFBRTt3QkFDMUUsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJ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cUJBQ2pDO3lCQUNJLElBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBQzt3QkFDcEQsSUFBSSxlQUFlLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUNyRCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxnQkFBZ0IsRUFBRSxFQUFFO2dDQUN4RixNQUFNLG1CQUFtQixHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dDQUMzRixNQUFNLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztnQ0FDdEQsSUFBSSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7b0NBQy9DLFdBQVcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7aUNBQ2pDOzRCQUNELENBQUMsQ0FBQSxDQUFDLENBQUM7NEJBQ0gsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDRjtnQkFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QjtpQkFDRztnQkFDRixXQUFXLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztLQUFBOzs7WUFyVUYsVUFBVTs7O1lBSEYsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU29mdHdhcmUgQUcsIERhcm1zdGFkdCwgR2VybWFueSBhbmQvb3IgaXRzIGxpY2Vuc29yc1xuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7IFRocm93U3RtdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tICdAYzh5L2NsaWVudCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdwS3BpT3ZlcnZpZXdXaWRnZXRTZXJ2aWNlIHtcbiAgbGF0ZXN0RmlybXdhcmVWZXJzaW9uOiBhbnk7XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW52ZW50b3J5OiBJbnZlbnRvcnlTZXJ2aWNlKSB7XG4gIH1cblxuICBhc3luYyBnZXREZXZpY2VzQXZhaWxhYmlsaXR5KGRldmljZUlkKXtcbiAgICBsZXQgdG90YWxEZXZpY2VzID0gMDtcbiAgICBsZXQgYXZhaWxhYmxlRGV2aWNlcyA9IDA7XG4gICAgbGV0IHVuYXZhaWxhYmxlRGV2aWNlcyA9IDA7XG4gICAgICBsZXQgcmVzcG9uc2U6IGFueSA9IG51bGw7XG4gICAgICBjb25zdCBpbnZlbnRvcnkgPSBhd2FpdCB0aGlzLmludmVudG9yeS5kZXRhaWwoZGV2aWNlSWQpO1xuICAgICAgcmVzcG9uc2UgPSBpbnZlbnRvcnkuZGF0YTtcbiAgICAgIGlmIChyZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0lzRGV2aWNlJykpIHtcbiAgICAgICAgdG90YWxEZXZpY2VzID0gMTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuY2hpbGREZXZpY2VzLnJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gcmVzcG9uc2UuY2hpbGREZXZpY2VzLnJlZmVyZW5jZXMubWFwKGFzeW5jIChjaGlsZERldmljZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRJbnZlbnRvcnkgPSBhd2FpdCB0aGlzLmludmVudG9yeS5kZXRhaWwoY2hpbGREZXZpY2UubWFuYWdlZE9iamVjdC5pZCk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZERldmljZURhdGEgPSBjaGlsZEludmVudG9yeS5kYXRhO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfQXZhaWxhYmlsaXR5Jykpe1xuXG4gICAgICAgICAgICAgIGlmIChjaGlsZERldmljZURhdGEuYzh5X0F2YWlsYWJpbGl0eS5zdGF0dXMgPT09ICdBVkFJTEFCTEUnKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYoYXZhaWxhYmxlKXtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0F2YWlsYWJpbGl0eScpKSB7XG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZS5jOHlfQXZhaWxhYmlsaXR5LnN0YXR1cyA9PT0gJ0FWQUlMQUJMRScpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVEZXZpY2VzID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHVuYXZhaWxhYmxlRGV2aWNlcyA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBhdmFpbGFibGVEZXZpY2VzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHVuYXZhaWxhYmxlRGV2aWNlcyA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UuaGFzT3duUHJvcGVydHkoJ2M4eV9BdmFpbGFiaWxpdHknKSAmJiAocmVzcG9uc2UuYzh5X0F2YWlsYWJpbGl0eS5zdGF0dXMgPT09ICdBVkFJTEFCTEUnKSkge1xuICAgICAgICAgICAgYXZhaWxhYmxlRGV2aWNlcyA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICB1bmF2YWlsYWJsZURldmljZXMgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IHJlc3BvbnNlLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubWFwKGFzeW5jIChjaGlsZERldmljZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBDaGlsZEludmVudG9yeSA9IGF3YWl0IHRoaXMuaW52ZW50b3J5LmRldGFpbChjaGlsZERldmljZS5tYW5hZ2VkT2JqZWN0LmlkKTtcbiAgICAgICAgICAgICAgY29uc3QgY2hpbGREZXZpY2VEYXRhID0gQ2hpbGRJbnZlbnRvcnkuZGF0YTtcbiAgICAgICAgICAgICAgaWYgKGNoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0F2YWlsYWJpbGl0eScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkRGV2aWNlRGF0YS5jOHlfQXZhaWxhYmlsaXR5LnN0YXR1cyA9PT0gJ0FWQUlMQUJMRScpIHtcbiAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZURldmljZXMgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIHVuYXZhaWxhYmxlRGV2aWNlcyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmKGNoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0lzQXNzZXQnKSl7XG4gICAgICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZERldmljZURhdGEuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlczEgPSBjaGlsZERldmljZURhdGEuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5tYXAoYXN5bmMgKGFzc2V0Q2hpbGREZXZpY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzZXRDaGlsZEludmVudG9yeSA9IGF3YWl0IHRoaXMuaW52ZW50b3J5LmRldGFpbChhc3NldENoaWxkRGV2aWNlLm1hbmFnZWRPYmplY3QuaWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NldENoaWxkRGV2aWNlRGF0YSA9IGFzc2V0Q2hpbGRJbnZlbnRvcnkuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0Q2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfQXZhaWxhYmlsaXR5Jykpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0Q2hpbGREZXZpY2VEYXRhLmM4eV9BdmFpbGFiaWxpdHkuc3RhdHVzID09PSAnQVZBSUxBQkxFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlczEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICBhdmFpbGFibGVEZXZpY2VzICs9IDE7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICB1bmF2YWlsYWJsZURldmljZXMgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b3RhbERldmljZXMgPSBpbnZlbnRvcnkuZGF0YS5jaGlsZEFzc2V0cy5yZWZlcmVuY2VzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3RvdGFsRGV2aWNlcywgYXZhaWxhYmxlRGV2aWNlcywgdW5hdmFpbGFibGVEZXZpY2VzfTtcbiAgICB9XG5cbiAgYXN5bmMgZ2V0RmlybXdhcmVSaXNrcyhkZXZpY2VJZCl7XG4gICAgbGV0IGhpZ2hSaXNrQ291bnQgPSAwO1xuICAgIGxldCBtZWRpdW1SaXNrQ291bnQgPSAwO1xuICAgIGxldCBsb3dSaXNrQ291bnQgPSAwO1xuICAgIGxldCBub1Jpc2tDb3VudCA9IDA7XG4gICAgY29uc3QgZmlybXdhcmVEYXRhID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkubGlzdCh7IHR5cGU6ICdzYWdfcmFjbV9jdXJyZW50RmlybXdhcmUnIH0pO1xuICAgIGlmIChmaXJtd2FyZURhdGEuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5sYXRlc3RGaXJtd2FyZVZlcnNpb24gPSBmaXJtd2FyZURhdGEuZGF0YVswXS5maXJtd2FyZS52ZXJzaW9uO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IGFueSA9IG51bGw7XG4gICAgY29uc3QgaW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGRldmljZUlkKTtcbiAgICByZXNwb25zZSA9IGludmVudG9yeS5kYXRhO1xuICAgIGlmIChyZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0lzRGV2aWNlJykpIHtcbiAgICAgIGNvbnN0IHJpc2tzID0gdGhpcy5jYWxjdWxhdGVSaXNrQ291bnQocmVzcG9uc2UpO1xuICAgICAgaGlnaFJpc2tDb3VudCA9IHJpc2tzLmhpZ2hSaXNrO1xuICAgICAgbWVkaXVtUmlza0NvdW50ID0gcmlza3MubWVkaXVtUmlzaztcbiAgICAgIGxvd1Jpc2tDb3VudCA9IHJpc2tzLmxvd1Jpc2s7XG4gICAgICBub1Jpc2tDb3VudCA9IHJpc2tzLm5vUmlzaztcbiAgICB9XG4gICAgZWxzZSBpZihyZXNwb25zZS5jaGlsZEFzc2V0cy5yZWZlcmVuY2VzLmxlbmd0aCA+IDApe1xuXG4gICAgICBjb25zdCBwcm9taXNlcyA9IHJlc3BvbnNlLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubWFwKGFzeW5jIChjaGlsZERldmljZSkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZEludmVudG9yeSA9IGF3YWl0IHRoaXMuaW52ZW50b3J5LmRldGFpbChjaGlsZERldmljZS5tYW5hZ2VkT2JqZWN0LmlkKTtcbiAgICAgICAgY29uc3QgY2hpbGREZXZpY2VEYXRhID0gY2hpbGRJbnZlbnRvcnkuZGF0YTtcbiAgICAgICAgaWYgKGNoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0lzRGV2aWNlJykpIHtcbiAgICAgICAgICBjb25zdCByaXNrcyA9IHRoaXMuY2FsY3VsYXRlUmlza0NvdW50KHJlc3BvbnNlKTtcbiAgICAgICAgICBoaWdoUmlza0NvdW50ID0gcmlza3MuaGlnaFJpc2s7XG4gICAgICAgICAgbWVkaXVtUmlza0NvdW50ID0gcmlza3MubWVkaXVtUmlzaztcbiAgICAgICAgICBsb3dSaXNrQ291bnQgPSByaXNrcy5sb3dSaXNrO1xuICAgICAgICAgIG5vUmlza0NvdW50ID0gcmlza3Mubm9SaXNrOyAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eSgnYzh5X0lzQXNzZXQnKSl7XG4gICAgICAgICAgaWYgKGNoaWxkRGV2aWNlRGF0YS5jaGlsZEFzc2V0cy5yZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzMSA9IGNoaWxkRGV2aWNlRGF0YS5jaGlsZEFzc2V0cy5yZWZlcmVuY2VzLm1hcChhc3luYyAoYXNzZXRDaGlsZERldmljZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXNzZXRDaGlsZEludmVudG9yeSA9IGF3YWl0IHRoaXMuaW52ZW50b3J5LmRldGFpbChhc3NldENoaWxkRGV2aWNlLm1hbmFnZWRPYmplY3QuaWQpO1xuICAgICAgICAgICAgY29uc3QgYXNzZXRDaGlsZERldmljZURhdGEgPSBhc3NldENoaWxkSW52ZW50b3J5LmRhdGE7XG4gICAgICAgICAgICBpZiAoYXNzZXRDaGlsZERldmljZURhdGEuaGFzT3duUHJvcGVydHkoJ2M4eV9Jc0RldmljZScpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJpc2tzID0gdGhpcy5jYWxjdWxhdGVSaXNrQ291bnQocmVzcG9uc2UpO1xuICAgICAgICAgICAgICBoaWdoUmlza0NvdW50ID0gcmlza3MuaGlnaFJpc2s7XG4gICAgICAgICAgICAgIG1lZGl1bVJpc2tDb3VudCA9IHJpc2tzLm1lZGl1bVJpc2s7XG4gICAgICAgICAgICAgIGxvd1Jpc2tDb3VudCA9IHJpc2tzLmxvd1Jpc2s7XG4gICAgICAgICAgICAgIG5vUmlza0NvdW50ID0gcmlza3Mubm9SaXNrOyAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICByZXR1cm4ge2hpZ2hSaXNrQ291bnQsIG1lZGl1bVJpc2tDb3VudCwgbG93Umlza0NvdW50LCBub1Jpc2tDb3VudH07XG4gIH1cblxuICBjYWxjdWxhdGVSaXNrQ291bnQoZGV2aWNlKXtcbiAgICBsZXQgYXRSaXNrID0gZmFsc2U7XG4gICAgbGV0IG5vUmlzayA9IDA7XG4gICAgbGV0IGxvd1Jpc2sgPSAwO1xuICAgIGxldCBtZWRpdW1SaXNrID0gMDtcbiAgICBsZXQgaGlnaFJpc2sgPSAwO1xuXG4gICAgaWYgKGRldmljZSkge1xuICAgICAgIGNvbnN0IGZpcm13YXJlU3RhdHVzID0gZGV2aWNlLmM4eV9GaXJtd2FyZTtcbiAgICAgICBsZXQgdmVyc2lvbklzc3VlcyA9IDA7XG4gICAgICAgaWYgKGZpcm13YXJlU3RhdHVzICAmJiBmaXJtd2FyZVN0YXR1cy52ZXJzaW9uKSB7XG4gICAgICAgICB2ZXJzaW9uSXNzdWVzID0gZmlybXdhcmVTdGF0dXMudmVyc2lvbiAtIHRoaXMubGF0ZXN0RmlybXdhcmVWZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgaWYgKHZlcnNpb25Jc3N1ZXMgPD0gMCkge1xuICAgICAgICAgIGF0UmlzayA9IHRydWU7IH1cbiAgICAgICBpZiAoIGF0Umlzaykge1xuICAgICAgICAgICAgaWYgKGF0Umlzaykge1xuICAgICAgICAgICAgICBpZiAodmVyc2lvbklzc3VlcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbm9SaXNrICs9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbklzc3VlcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsb3dSaXNrICs9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbklzc3VlcyA9PT0gLTIpIHtcbiAgICAgICAgICAgICAgICBtZWRpdW1SaXNrICs9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbklzc3VlcyA8PSAtMykge1xuICAgICAgICAgICAgICAgIGhpZ2hSaXNrICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtub1Jpc2ssIGxvd1Jpc2ssIG1lZGl1bVJpc2ssIGhpZ2hSaXNrfVxuICB9XG4gIGFzeW5jIGdldEFsYXJtcyhkZXZpY2VJZCl7XG4gICAgbGV0IHRvdGFsQWxhcm1zID0gMDtcbiAgICBsZXQgbWFqb3JBbGVydHNDb3VudCA9IDA7XG4gICAgbGV0IG1pbm9yQWxlcnRzQ291bnQgPSAwO1xuICAgIGxldCBjcml0aWNhbEFsZXJ0c0NvdW50ID0gMDtcbiAgICBsZXQgcmVzcG9uc2U6IGFueSA9IG51bGw7XG4gICAgY29uc3QgaW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGRldmljZUlkKTtcbiAgICByZXNwb25zZSA9IGludmVudG9yeS5kYXRhO1xuXG4gICAgaWYgKHJlc3BvbnNlLmhhc093blByb3BlcnR5KCdjOHlfSXNEZXZpY2UnKSkge1xuICAgICAgY29uc3QgYWxlcnRzID0gdGhpcy5jYWxjdWxhdGVBbGFybXNDb3VudChyZXNwb25zZSk7XG4gICAgICBtaW5vckFsZXJ0c0NvdW50ID0gYWxlcnRzLm1pbm9yQWxlcnRzO1xuICAgICAgbWFqb3JBbGVydHNDb3VudCA9IGFsZXJ0cy5tYWpvckFsZXJ0cztcbiAgICAgIGNyaXRpY2FsQWxlcnRzQ291bnQgPSBhbGVydHMuY3JpdGljYWxBbGVydHM7XG4gICAgfVxuICAgIGVsc2UgaWYocmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKXtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gcmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5tYXAoYXN5bmMgKGNoaWxkRGV2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkSW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGNoaWxkRGV2aWNlLm1hbmFnZWRPYmplY3QuaWQpO1xuICAgICAgICBjb25zdCBjaGlsZERldmljZURhdGEgPSBjaGlsZEludmVudG9yeS5kYXRhO1xuICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfSXNEZXZpY2UnKSkge1xuICAgICAgICAgIGNvbnN0IGFsZXJ0cyA9IHRoaXMuY2FsY3VsYXRlQWxhcm1zQ291bnQoY2hpbGREZXZpY2VEYXRhKTtcbiAgICAgICAgICBtaW5vckFsZXJ0c0NvdW50ID0gYWxlcnRzLm1pbm9yQWxlcnRzO1xuICAgICAgICAgIG1ham9yQWxlcnRzQ291bnQgPSBhbGVydHMubWFqb3JBbGVydHM7XG4gICAgICAgIGNyaXRpY2FsQWxlcnRzQ291bnQgPSBhbGVydHMuY3JpdGljYWxBbGVydHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjaGlsZERldmljZURhdGEuaGFzT3duUHJvcGVydHkoJ2M4eV9Jc0Fzc2V0Jykpe1xuICAgICAgICAgIGlmIChjaGlsZERldmljZURhdGEuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlczEgPSBjaGlsZERldmljZURhdGEuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5tYXAoYXN5bmMgKGFzc2V0Q2hpbGREZXZpY2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFzc2V0Q2hpbGRJbnZlbnRvcnkgPSBhd2FpdCB0aGlzLmludmVudG9yeS5kZXRhaWwoYXNzZXRDaGlsZERldmljZS5tYW5hZ2VkT2JqZWN0LmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2V0Q2hpbGREZXZpY2VEYXRhID0gYXNzZXRDaGlsZEludmVudG9yeS5kYXRhO1xuICAgICAgICAgICAgaWYgKGFzc2V0Q2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfSXNEZXZpY2UnKSkge1xuICAgICAgICAgICAgICBjb25zdCBhbGVydHMgPSB0aGlzLmNhbGN1bGF0ZUFsYXJtc0NvdW50KGFzc2V0Q2hpbGREZXZpY2VEYXRhKTtcbiAgICAgICAgICAgICAgbWlub3JBbGVydHNDb3VudCA9IGFsZXJ0cy5taW5vckFsZXJ0cztcbiAgICAgICAgICAgICAgbWFqb3JBbGVydHNDb3VudCA9IGFsZXJ0cy5tYWpvckFsZXJ0cztcbiAgICAgICAgICAgICAgY3JpdGljYWxBbGVydHNDb3VudCA9IGFsZXJ0cy5jcml0aWNhbEFsZXJ0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICB0b3RhbEFsYXJtcyA9IG1ham9yQWxlcnRzQ291bnQgKyBtaW5vckFsZXJ0c0NvdW50ICsgY3JpdGljYWxBbGVydHNDb3VudDtcbiAgICByZXR1cm4ge3RvdGFsQWxhcm1zLCBtYWpvckFsZXJ0c0NvdW50LCBtaW5vckFsZXJ0c0NvdW50LCBjcml0aWNhbEFsZXJ0c0NvdW50fTtcbiAgfVxuXG5cbiAgY2FsY3VsYXRlQWxhcm1zQ291bnQoZGV2aWNlKXtcbiAgICBsZXQgbWlub3JBbGVydHMgPSAwO1xuICAgIGxldCBtYWpvckFsZXJ0cyA9IDA7XG4gICAgbGV0IGNyaXRpY2FsQWxlcnRzID0gMDtcbiAgICBjb25zdCBhY3RpdmVBbGVydHMgPSBkZXZpY2UuYzh5X0FjdGl2ZUFsYXJtc1N0YXR1cztcbiAgICBpZiAoYWN0aXZlQWxlcnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoYWN0aXZlQWxlcnRzLmhhc093blByb3BlcnR5KCdtaW5vcicpKSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlQWxlcnRzLm1pbm9yID4gMCkgeyBtaW5vckFsZXJ0cyArPSBkZXZpY2UuYzh5X0FjdGl2ZUFsYXJtc1N0YXR1cy5taW5vcjsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aXZlQWxlcnRzLmhhc093blByb3BlcnR5KCdtYWpvcicpKSB7XG4gICAgICAgICAgIGlmIChhY3RpdmVBbGVydHMubWFqb3IgPiAwKSB7IG1ham9yQWxlcnRzICs9IGRldmljZS5jOHlfQWN0aXZlQWxhcm1zU3RhdHVzLm1ham9yIH1cbiAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aXZlQWxlcnRzLmhhc093blByb3BlcnR5KCdjcml0aWNhbCcpKSB7XG4gICAgICAgICAgIGlmIChhY3RpdmVBbGVydHMuY3JpdGljYWwgPiAwKSB7IGNyaXRpY2FsQWxlcnRzICs9IGRldmljZS5jOHlfQWN0aXZlQWxhcm1zU3RhdHVzLmNyaXRpY2FsIH1cbiAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge21pbm9yQWxlcnRzLCBtYWpvckFsZXJ0cywgY3JpdGljYWxBbGVydHN9XG4gIH1cblxuICBhc3luYyBnZXROZXdLUElDb3VudChkZXZpY2VJZCwgbmV3S1BJKXtcbiAgICBsZXQgbmV3S1BJQ291bnQgPSAwO1xuICAgIGxldCByZXNwb25zZTogYW55ID0gbnVsbDtcbiAgICBjb25zdCBpbnZlbnRvcnkgPSBhd2FpdCB0aGlzLmludmVudG9yeS5kZXRhaWwoZGV2aWNlSWQpO1xuICAgIHJlc3BvbnNlID0gaW52ZW50b3J5LmRhdGE7XG4gICAgaWYgKHJlc3BvbnNlLmhhc093blByb3BlcnR5KCdjOHlfSXNEZXZpY2UnKSAmJiByZXNwb25zZS5oYXNPd25Qcm9wZXJ0eShuZXdLUEkpKSB7XG4gICAgICBuZXdLUElDb3VudCA9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYocmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKXtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gcmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5tYXAoYXN5bmMgKGNoaWxkRGV2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkSW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGNoaWxkRGV2aWNlLm1hbmFnZWRPYmplY3QuaWQpO1xuICAgICAgICBjb25zdCBjaGlsZERldmljZURhdGEgPSBjaGlsZEludmVudG9yeS5kYXRhO1xuICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KG5ld0tQSSkpIHtcbiAgICAgICAgICBuZXdLUElDb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfSXNBc3NldCcpKXtcbiAgICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMxID0gY2hpbGREZXZpY2VEYXRhLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubWFwKGFzeW5jIChhc3NldENoaWxkRGV2aWNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhc3NldENoaWxkSW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGFzc2V0Q2hpbGREZXZpY2UubWFuYWdlZE9iamVjdC5pZCk7XG4gICAgICAgICAgICBjb25zdCBhc3NldENoaWxkRGV2aWNlRGF0YSA9IGFzc2V0Q2hpbGRJbnZlbnRvcnkuZGF0YTtcbiAgICAgICAgICAgIGlmIChhc3NldENoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eShuZXdLUEkpKSB7XG4gICAgICAgICAgICAgIG5ld0tQSUNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIG5ld0tQSUNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0tQSUNvdW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0TmV3S1BJVmFsdWUoZGV2aWNlSWQsIG5ld0tQSSl7XG4gICAgbGV0IHJlc3BvbnNlOiBhbnkgPSBudWxsO1xuICAgIGxldCBuZXdLUElWYWx1ZTtcbiAgICBjb25zdCBpbnZlbnRvcnkgPSBhd2FpdCB0aGlzLmludmVudG9yeS5kZXRhaWwoZGV2aWNlSWQpO1xuICAgIHJlc3BvbnNlID0gaW52ZW50b3J5LmRhdGE7XG4gICAgaWYgKHJlc3BvbnNlLmhhc093blByb3BlcnR5KCdjOHlfSXNEZXZpY2UnKSAmJiByZXNwb25zZS5oYXNPd25Qcm9wZXJ0eShuZXdLUEkpKSB7XG4gICAgICBuZXdLUElWYWx1ZSA9IHJlc3BvbnNlW25ld0tQSV07XG4gICAgfVxuICAgIGVsc2UgaWYocmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5sZW5ndGggPiAwKXtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gcmVzcG9uc2UuY2hpbGRBc3NldHMucmVmZXJlbmNlcy5tYXAoYXN5bmMgKGNoaWxkRGV2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkSW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGNoaWxkRGV2aWNlLm1hbmFnZWRPYmplY3QuaWQpO1xuICAgICAgICBjb25zdCBjaGlsZERldmljZURhdGEgPSBjaGlsZEludmVudG9yeS5kYXRhO1xuICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KG5ld0tQSSkpIHtcbiAgICAgICAgICBuZXdLUElWYWx1ZSArPSByZXNwb25zZVtuZXdLUEldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoY2hpbGREZXZpY2VEYXRhLmhhc093blByb3BlcnR5KCdjOHlfSXNBc3NldCcpKXtcbiAgICAgICAgICBpZiAoY2hpbGREZXZpY2VEYXRhLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMxID0gY2hpbGREZXZpY2VEYXRhLmNoaWxkQXNzZXRzLnJlZmVyZW5jZXMubWFwKGFzeW5jIChhc3NldENoaWxkRGV2aWNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhc3NldENoaWxkSW52ZW50b3J5ID0gYXdhaXQgdGhpcy5pbnZlbnRvcnkuZGV0YWlsKGFzc2V0Q2hpbGREZXZpY2UubWFuYWdlZE9iamVjdC5pZCk7XG4gICAgICAgICAgICBjb25zdCBhc3NldENoaWxkRGV2aWNlRGF0YSA9IGFzc2V0Q2hpbGRJbnZlbnRvcnkuZGF0YTtcbiAgICAgICAgICAgIGlmIChhc3NldENoaWxkRGV2aWNlRGF0YS5oYXNPd25Qcm9wZXJ0eShuZXdLUEkpKSB7XG4gICAgICAgICAgICAgIG5ld0tQSVZhbHVlICs9IHJlc3BvbnNlW25ld0tQSV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIG5ld0tQSVZhbHVlID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBuZXdLUElWYWx1ZTtcbiAgfVxufVxuIl19