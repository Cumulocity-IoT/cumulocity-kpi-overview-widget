import { InventoryService } from '@c8y/client';
export declare class GpKpiOverviewWidgetService {
    inventory: InventoryService;
    latestFirmwareVersion: any;
    constructor(inventory: InventoryService);
    getDevicesAvailability(deviceId: any): Promise<{
        totalDevices: number;
        availableDevices: number;
        unavailableDevices: number;
    }>;
    getFirmwareRisks(deviceId: any): Promise<{
        highRiskCount: number;
        mediumRiskCount: number;
        lowRiskCount: number;
        noRiskCount: number;
    }>;
    calculateRiskCount(device: any): {
        noRisk: number;
        lowRisk: number;
        mediumRisk: number;
        highRisk: number;
    };
    getAlarms(deviceId: any): Promise<{
        totalAlarms: number;
        majorAlertsCount: number;
        minorAlertsCount: number;
        criticalAlertsCount: number;
    }>;
    calculateAlarmsCount(device: any): {
        minorAlerts: number;
        majorAlerts: number;
        criticalAlerts: number;
    };
    getNewKPICount(deviceId: any, newKPI: any): Promise<number>;
    getNewKPIValue(deviceId: any, newKPI: any): Promise<any>;
}
