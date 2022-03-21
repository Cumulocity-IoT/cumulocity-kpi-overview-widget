import '~styles/index.css';
import { __awaiter } from 'tslib';
import { Injectable, Component, Input, EventEmitter, ElementRef, Output, ViewChild, HostListener, NgModule } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { get, has, set } from 'lodash';
import { CommonModule, CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

class GpKpiOverviewWidgetService {
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

class GpKpiOverviewWidgetComponent {
    constructor(kpiService) {
        this.kpiService = kpiService;
        this.device = {
            id: ''
        };
        this.kpi = {
            title: '',
            topMargin: '',
            icon: '',
            value: 0,
            unit: '',
            color: '',
            bgcolor: '',
            unitColor: '',
            titleColor: '',
            messageColor: '',
            otherKPIName: '',
            otherKPIMetric: '',
            kpiName: '',
            message: '',
            titleSize: 20,
            messageSize: 10,
            kpiSize: 30,
            unitSize: 20,
            imageSize: 60,
            containerHeight: 80,
            default: {
                color: '',
                bgcolor: ''
            }
        };
    }
    ngOnInit() {
        // Get Device Id
        this.device.id = get(this.config, 'device.id');
        if (this.device.id === undefined || this.device.id.length === 0) {
        }
        // Get KPI Title
        this.kpi.title = get(this.config, 'customwidgetdata.metadata.title');
        if (this.kpi.title === undefined || this.kpi.title.length === 0) {
            this.kpi.title = 'Default Title';
        }
        // Get KPI Name
        this.kpi.kpiName = get(this.config, 'customwidgetdata.kpi.kpiName');
        if (this.kpi.kpiName === undefined || this.kpi.kpiName.length === 0) {
            this.kpi.kpiName = 'totalDevices';
        }
        // Get KPI Icon
        this.kpi.icon = get(this.config, 'customwidgetdata.metadata.icon');
        if (this.kpi.icon === undefined || this.kpi.icon.length === 0) {
            this.kpi.icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAADmlJREFUeJzt3XuwVWUZx/HvAygIAiEkaEh4i8wuZlJqN01r0mSyUnO66mSWWRY5OTpOt3FySsMarWzU1MlpMvPC5GUSK03UsqFESvECmlfIQJQEPHA4qz8WRw/Hvc9e71mX5117/T4z7z+bzTm/9e79nPXuvdb7viAiIiIiIiIiIiIiIiIijWPeAUSGaTIwBRgL9ABrgJVA4hlKxMsewOkYCzBWYSQt2jqMuzHOBd6DTgDSAIdj3N6mIDq1R4G5wDjvgxAp2l4Ytw6zMAa3p4BPeB+QSFFOxNhQUHEMbFcBE70PTmS4DGNeCYUxsP0TmO59oCLhjPNLLo7+thzYyftwRULMrag4+ttiYDvvgxbJYjbGxooLJMG4yPvARToZibHYoTjSBgd5d4DIUE5wK4603YMuKEqkRmAscy6QBDiifUARP4cAu3uHwPh8u39SgYgf41jvCFscBoxv9Q8qEPF0qHeALbahzYd1FYh4mQbM8A7xEmO/Vg+rQMTL670DDDKr1YMqEPEyzTvAIFNaPagCES/bewcYpGUeFYh4iW1q7IZWD6pAxMtz3gEGWdPqQRWIeHnMO8Agy1s9qAIRL0uBzd4hXpKwpNXDKhDxsg5Y7B1igFtbPagCEU83egfYYhHwZKt/UIGIn4RfEcO3WQm/9I4g0ppxk/Pt7qvQulkSsdkYfY5zQb7u3QEiQzMudiqQJcAo78MX6WQCxsMVF8c64A3eBy6S1d4Yz1VUHJuBj3gfsEioAzGeL7k4eoHjvA9UZLjejPHvkorjOYZYoEGkLiZR/FpZC4HdvA9MpAiG8VRBhfEg8CnvAxIp0gE5i+J50q0O5pDzbhF9ByzxMT4W8OwFwH3AWhIeAe4H7iGmO4VFCmUsz3im6AN29o4rUqV9AoZSd5YdRnfzSlyMj2Z+bsK1JSYRiZBxX+YzCMz0jitSpVkBw6u/VxFIQyyJiYZXIm0ZiwKGV7EtXSpSqhkBw6v7qgqlIZbEIvvwCg2vpGmM2wOGV/t4xxWp0lSMzRkLpOUKiGXREEticCTZ34vXlBlEJD7GzQHDq/2944pUaRLGxowF8iQV72muIZZ4m0O6iWYW1xLDSowilTHmBwyvDvKOK1KlcRjrMxbIM8DIqgNqiCWeDge2y/jc+TjMEtSU284mk+6Auh3QQ7pV10rXRN1Ccz9qaQ/gdIwFGKvanO7/h3EnxveA2d6Ba2o0xtqMw6s1ZP8gLyU5POh2h1fePHc8ehFDHBHQv9q/w9FeGLcOszAGt/uBg70PqBaMSwO+vfqwd9ymOhFjQ0HF0d/6MH6APt8NZeQQw9fB7QVgjHfgpjGMeQUXxuB2Pdm/oWma9wX041XeYZvHOL/k4uhvtwDbeh9udIyfBgyvPu4dt2nmVlQc/e0y7wOOTMi6uy8C23sHbpLZZL8xrrgGn/U+8IiErLv7O++wTTKS4pfUz9qeJb3YKMYP9YclTic4FUd/u8C7A6KQfd3djcAk77hNMQJjmXOBbACmeneEs5B1dxd4h4Xm3Kx4CLC7c4YxNH0jl7B7rzS1tjLGL5zPHv1tkXdXuMq+7u5mdLatkPFYBMXR/8Lv4N0dTkLW3b3dO2y/JgyxpgEzvENsMYLm3v1by+FVEwoktjVcZ3kHcJF9W7WEiFZObEKBTPMOsBWLLE81ZgBvy/jcRcATJWYJ0oQCie1WhfHeARzUcngFzSiQ2JaJiS1P+cJ2rVWBVOxZ7wBbSVjtHaFiU4EDMz53CbCsxCzBmlAgj3oHGOQR7wAVy77uboQLMzShQJaSrkYSi3u8A1Qq5Op5ZMOr5jBui+AiYYKxkorXlnUWsu7ug95hW2nCGQQS5ntH2GI+zfqQHrrurjjZEaPH/QzStKvoYevu7ucdt9lClpkpr12Aw/qyTsaRfcWYf3uHFZiJ8WIERXITzbhYeHRAn/zIO6ykvh1BgSQYS4jnBspyGL/O3B/wLu+4ktoG4+4ICiTBWAG83btDShKy7u4KmvJlUU1Mx3g6ggJJMNYDR3l3SAlC1t39mXdYGcy4JILi6G99wBneXVKosHV3D/WOK1vbG6M3gsIY3C6jO1ZhHEX2dXdXozWMIxOy5fDw2vM5/u9t1H9K7iEBx3upd1jZ2uElFsYK4DhgYs4ifAjY07ebcghbd/cI77jyslEYS0sojH8AXwLGDvpdF+b4mauB9/p0Uy4h6+6uBUZ7B+6kSeO/kwibn341sBrYDZhAegV8I7AKeJSExcBt0PIqcC8JJwEPYswj/GvMHTAWkPAF4PLA/+tpf2DnjM+9gbjusm60SRirA/6Cr6S4q91zSPc0HO7Z5Gzqcgdw2Lq7IbMMpVTGj4PelHBCwQn2wXgiR5H8ljpsxpN93d31bD0kFUezCNvyYDHlXNndCWNRjiK5m9hWaNlayLq7urU9Gsb1gWePMjfhHItxbY4ieQx4U4n5hs84K6CPP+kdV1LvD3wDVjGxyjDOyVEka4HDKsgZJvu6uz3ARO+4km6Y88+AN14PsEeF+U5g+Ltd9QJfqTBrJyHr7t7kHVZSXwx80/3QIeP7MNbkOJvEMgHrjIDh1ee8w0p6NfuZgDfaf/E77b+efJv7+E/Ayv7lQy/aii4CxrlBb7L0IqKnyRgLcxSJ5wSsGQE5/+SUUQbYnbAFGv5FHMOUbTGuyFEkXhOwvhbwh+hkh3yyldCvUeED3pEH+SZG3zCLpPoJWNnPfH1kvw1FSnJQ4BvqRu/AbRxL9hVBWr0Rq5qANRVjc8Zcd1WUSdoYgXFPwBtpE/FtrjPQARj/yTHkqmIC1hcCztSnlpxFOvhc4BvofO/AGczE+FeOIrmNMidghcx7gZml5ZCOtsdYEfDGWU19Zu5NCHojvrKVNQErZN3df5Tw+yUz4+ygNw2c4h05UIwTsD4T0N9nFvy7JcBrCftAu5T6ThT7Gtk/FA9uPaRTgosRtu5uzJ/1upzxm8Czx4e8I+cUwwSskHV37y/ioGV43hn45rjZO3BBvCdghay7e1ZRBy1hDONvAS9UL7C3d+gC+U3AClt3d59Cj1oy+3TgG+JC78AlKHMClgHvAL6FcQPGw6RDu5Cr/Mur6woZaCzGkwEv1HN0712kRU/AGgecivFIjp/Z38516pOGM74T9EI14ypuEROwjqHIhb3TZYCkYtMx1gW8UA/THWveZpF3AlaxDU6jLksWdY3QW8LTfbqbJO8ErKLb1cAY705pircT9iGxqRN08k7AKrr9kTqs61V7xp0BL8pm4C3ekR3lnYBVdLsGDbdKdWzgC3KJd+BI5JmAVWyDb3h3Rrcag/FYwIuxFpjqHToieSZgFdleBGZ5d0Y3OjPwL1V3bWlWjLwTsIpq13t3RLfZibCb8x6lBvtOOJlJ9gWmyxxq7evdEd0jZEPItPOP9o4csVFk3+CmzHaxd0d0i30Jm/+w0Dtw5A6LoDgSjDXUd05ORIw/B3R6H7Cfd+SoGT+PoDj6z/Tv8u6OLMrYB6MoHwPeE/D8K4BFJWXpFiH9WTbdp5XDaMI+TL6AFiXrZHTgcLXsVostoGM9g3yVdPPMbBLOAZ4uLU13mE5cr/d07wB1tSPG8wF/iR5H9/lk8dYIzhoD21+9OySLmP6ipNI5zBMyPz/hDGBDaXm6x2bvAIPElqcW3oTRG/BX6C/oBrisdo3grDGw/d67Q7KI6wxinEf2rQgSEuYCSYmJusnTQJ93iAEe9w6QRUwFMgc4NOD5V0I9xrGR6AEe8Q7xkoQHvCPUyTYYDwacntcDu3iHrh3j8giGVmnz2ewnWCxnkJOB1wU8fx7wRElZulcSzcJ5q4G/e4eoi8kYzwb89XmKdGkaCTeWfMuWFtV+4t0R9WFcEHhqPs47cq0Z5zsXRx/dtcJlqfbC2BTQuYvQ17p57YLv7MKrvTugPoybAs8e7/aO3BVCF94rrq0H7TSV1QcDO/e33oG7yGjC9nMspqWrN0oGozDuC+jcF4FdvUN3mT0xVldYIFd6H3CdnBzYud/3Dtyl9qeab7X+gNYJyOxVGKsCOnclMN47dBebjfFMicVxLVp6NIBxXuC49fPekRtgF4w7Ci6MXtLNO2v9rWPR4Q2YSXpVfAowlvRq/TrSm9P+R7qz0TYZf969JOxLXDfZdasRwEmk0w0m5fxZd5DwZeDe/LHqbwzpyn1XBw6dspw9DvY+uAYaD5xGuqNUyOu1CeNGwm447WrjSbfnKrYoXm7zvQ9Q2A84HeM6jPtJbwnahLEeYyXGXaRrIH8a2NE5a1SOosidiF7ZeoA9vA9SJNS2GBeVWBj9bZ73gYqE2h7jlgqK47/ARO+DFYHs80G2xbiOaj6ArULTaKVWqhlWDWzXU/Pvz6U5jqq4ONIGp3gfuEgn4yn326qh2gto9T1x1ukzyFxgpyqCtDAO47tOv1sEGHqcPwbjSWByVWFa2ETCrsBTjhmkwYY6gxyJb3FAes/W8c4ZpMHaF4hxVIU52jOO8Y4gzdVuiGVbLth5n0FSCTsDK7xjSPO0O4PMJJbiSNViFT7pPu0KJGSVwyrElkcaol2BTKk0RSfGNO8I0kztCiS2HZs0p1lctCuQnkpTdLbeO4A0U7sCWVNpik6SyPJIY7QrkGWVpuhsuXcAaaahCmRdlUE6WOIdQJqpXYH0AndWGWQIK4Gl3iGkmdrfapJEs6pILDlEtrIDvvtI9E+cOsC7I0RaM37qXCALvbtAZCivwXNPO3ivdweIdHKqU4Fc4X3gIlmMoJr1sAa2ZcAE7wMXyWoyxgMVFcezaBdUqaEZGA9VUBz61kpq69UUv9FKf1sOvNH7AEXyGoVxFsbGgj+Qaz1e6Sp7kW6a05ejMBair3Kly83COJvsOxKtwLgQfdaQGih6gehdgH2B12FMAcYBG0jncywn3bPugYJ/p4iIiIiIiIiIiIiIiIiISHH+DxoECITLjQoBAAAAAElFTkSuQmCC';
        }
        // Get KPI Message
        this.kpi.message = get(this.config, 'customwidgetdata.kpi.message');
        if (this.kpi.message === undefined || this.kpi.message.length === 0) {
            this.kpi.message = '';
        }
        // Get KPI Color
        this.kpi.default.color = get(this.config, 'customwidgetdata.kpi.color');
        if (this.kpi.default.color === undefined || this.kpi.default.color.indexOf('#') !== 0) {
            this.kpi.default.color = '#b0b0b0';
        }
        this.kpi.color = this.kpi.default.color;
        // Get Bg KPI Color
        this.kpi.default.bgcolor = get(this.config, 'customwidgetdata.kpi.bgcolor');
        if (this.kpi.default.bgcolor === undefined || this.kpi.default.bgcolor.indexOf('#') !== 0) {
            this.kpi.default.bgcolor = '#FFFFFF';
        }
        this.kpi.bgcolor = this.kpi.default.bgcolor;
        // Get Title Color
        this.kpi.titleColor = get(this.config, 'customwidgetdata.kpi.titleColor');
        if (this.kpi.titleColor === undefined || this.kpi.titleColor.indexOf('#') !== 0) {
            this.kpi.titleColor = '#b0b0b0';
        }
        // Get Unit Color
        this.kpi.unitColor = get(this.config, 'customwidgetdata.kpi.unitColor');
        if (this.kpi.unitColor === undefined || this.kpi.unitColor.indexOf('#') !== 0) {
            this.kpi.unitColor = '#b0b0b0';
        }
        // Get message Color
        this.kpi.messageColor = get(this.config, 'customwidgetdata.kpi.messageColor');
        if (this.kpi.messageColor === undefined || this.kpi.messageColor.indexOf('#') !== 0) {
            this.kpi.messageColor = '#808080';
        }
        // Get KPI Unit
        this.kpi.unit = get(this.config, 'customwidgetdata.kpi.unit');
        this.kpi.titleSize = get(this.config, 'customwidgetdata.kpi.titleSize');
        this.kpi.kpiSize = get(this.config, 'customwidgetdata.kpi.kpiSize');
        this.kpi.unitSize = get(this.config, 'customwidgetdata.kpi.unitSize');
        this.kpi.messageSize = get(this.config, 'customwidgetdata.kpi.messageSize');
        this.kpi.imageSize = get(this.config, 'customwidgetdata.kpi.imageSize');
        this.kpi.value = null;
        this.getDeviceData();
    }
    ngAfterViewInit() {
        this.configureTopMarginRequired();
    }
    // Configure top margin within the widget. This is on the basis if the Widget title is set to hidden or not.
    configureTopMarginRequired() {
        const allWidgets = document.querySelectorAll('.dashboard-grid-child');
        allWidgets.forEach((w) => {
            const widgetElement = w.querySelector('div > div > div > c8y-dynamic-component > lib-gp-kpi-overview-widget');
            if (widgetElement !== undefined && widgetElement !== null) {
                const widgetTitleElement = w.querySelector('div > div > div > c8y-dashboard-child-title');
                const widgetTitleDisplayValue = window.getComputedStyle(widgetTitleElement).getPropertyValue('display');
                if (widgetTitleDisplayValue !== undefined && widgetTitleDisplayValue !== null && widgetTitleDisplayValue === 'none') {
                    this.kpi.topMargin = '25px';
                }
                else {
                    this.kpi.topMargin = '0';
                }
            }
        });
    }
    getDeviceData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.kpi.kpiName !== null && this.kpi.kpiName !== '') {
                if (this.kpi.kpiName === 'totalDevices') {
                    const result = yield this.kpiService.getDevicesAvailability(this.device.id);
                    if (result) {
                        this.kpi.value = result.totalDevices;
                    }
                }
                else if (this.kpi.kpiName === 'available') {
                    const result = yield this.kpiService.getDevicesAvailability(this.device.id);
                    if (result) {
                        this.kpi.value = result.availableDevices;
                    }
                }
                else if (this.kpi.kpiName === 'unavailable') {
                    const result = yield this.kpiService.getDevicesAvailability(this.device.id);
                    if (result) {
                        this.kpi.value = result.unavailableDevices;
                    }
                }
                else if (this.kpi.kpiName === 'totalAlarms') {
                    const result = yield this.kpiService.getAlarms(this.device.id);
                    if (result) {
                        this.kpi.value = result.totalAlarms;
                    }
                }
                else if (this.kpi.kpiName === 'major') {
                    const result = yield this.kpiService.getAlarms(this.device.id);
                    if (result) {
                        this.kpi.value = result.majorAlertsCount;
                    }
                }
                else if (this.kpi.kpiName === 'minor') {
                    const result = yield this.kpiService.getAlarms(this.device.id);
                    if (result) {
                        this.kpi.value = result.minorAlertsCount;
                    }
                }
                else if (this.kpi.kpiName === 'critical') {
                    const result = yield this.kpiService.getAlarms(this.device.id);
                    if (result) {
                        this.kpi.value = result.criticalAlertsCount;
                    }
                }
                else if (this.kpi.kpiName === 'highRisk') {
                    const result = yield this.kpiService.getFirmwareRisks(this.device.id);
                    if (result) {
                        this.kpi.value = result.highRiskCount;
                    }
                }
                else if (this.kpi.kpiName === 'mediumRisk') {
                    const result = yield this.kpiService.getFirmwareRisks(this.device.id);
                    if (result) {
                        this.kpi.value = result.mediumRiskCount;
                    }
                }
                else if (this.kpi.kpiName === 'lowRisk') {
                    const result = yield this.kpiService.getFirmwareRisks(this.device.id);
                    if (result) {
                        this.kpi.value = result.lowRiskCount;
                    }
                }
                else if (this.kpi.kpiName === 'noRisk') {
                    const result = yield this.kpiService.getFirmwareRisks(this.device.id);
                    if (result) {
                        this.kpi.value = result.noRiskCount;
                    }
                }
                else if (this.kpi.kpiName === 'other') {
                    if (this.kpi.otherKPIMetric === 'value') {
                        const result = yield this.kpiService.getNewKPIValue(this.device.id, this.kpi.otherKPIName);
                        if (result) {
                            this.kpi.value = result;
                        }
                    }
                    else if (this.kpi.otherKPIMetric === 'count') {
                        const result = yield this.kpiService.getNewKPICount(this.device.id, this.kpi.otherKPIName);
                        if (result) {
                            this.kpi.value = result;
                        }
                    }
                }
                else {
                    this.kpi.value = 0;
                }
            }
        });
    }
    // Getter KPI Title
    getKPITitle() {
        return this.kpi.title;
    }
    // Getter KPI Title Top Margin
    getKPITitleTopMargin() {
        return this.kpi.topMargin;
    }
    // Getter KPI Icon
    getKPIIcon() {
        return this.kpi.icon;
    }
    // Get KPI Container Height
    getKPIContainerHeight() {
        return '90px';
    }
    // Getter KPI Value
    getKPIValue() {
        return this.kpi.value;
    }
    // Getter KPI Unit
    getKPIUnit() {
        return this.kpi.unit;
    }
    // Getter KPI Name
    getKPIName() {
        return this.kpi.kpiName;
    }
    // Getter KPI Color
    getKPIColor() {
        return this.kpi.color;
    }
    // Getter Title Color
    getTitleColor() {
        return this.kpi.titleColor;
    }
    // Getter Unit Color
    getUnitColor() {
        return this.kpi.unitColor;
    }
    // Getter Message Color
    getMessageColor() {
        return this.kpi.messageColor;
    }
    // Getter KPI background Color
    getKPIBgColor() {
        return this.kpi.bgcolor;
    }
    // Getter Other KPI Name
    getOtherKPIName() {
        return this.kpi.otherKPIName;
    }
    // Getter Other KPI metric
    getOtherKPIMetric() {
        return this.kpi.otherKPIMetric;
    }
    // Getter Other KPI Message
    getKPIMessage() {
        return this.kpi.message;
    }
    getKPISize() {
        return this.kpi.kpiSize + 'px';
    }
    getTitleSize() {
        return this.kpi.titleSize + 'px';
    }
    getMessageSize() {
        return this.kpi.messageSize + 'px';
    }
    getUnitSize() {
        return this.kpi.unitSize + 'px';
    }
    getImageSize() {
        return this.kpi.imageSize + 'px';
    }
    getContainerHeight() {
        if (this.kpi.imageSize > this.kpi.titleSize && this.kpi.imageSize > this.kpi.kpiSize) {
            this.kpi.containerHeight = this.kpi.imageSize + 10;
        }
        else if (this.kpi.titleSize > this.kpi.kpiSize) {
            this.kpi.containerHeight = this.kpi.titleSize + 10;
        }
        else {
            this.kpi.containerHeight = this.kpi.kpiSize + 10;
        }
        return this.kpi.containerHeight + 'px';
    }
}
GpKpiOverviewWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-gp-kpi-overview-widget',
                template: "<div [style.margin-top] = \"getKPITitleTopMargin()\">\r\n<ng-container>\r\n    <div [style.height] = \"getContainerHeight()\">\r\n    <div class=\"col-xs-5\" style=\"text-align: center;\">\r\n        <span style=\"display: inline-block; height: 100%; vertical-align: middle;\"></span>\r\n        <img [style.max-width] = \"getImageSize()\" [style.max-height] = \"getImageSize()\" style=\"vertical-align: middle;\" [src]=\"getKPIIcon()\" />\r\n    </div>\r\n    <div class=\"col-xs-7\" style=\"text-align: center;\">\r\n        <!-- KPI title -->\r\n        <p  [style.color] = \"getTitleColor()\" [style.font-size] = \"getTitleSize()\" style = \"margin-bottom: 5px; text-transform: uppercase; font-weight: bold;\">{{getKPITitle()}}</p>\r\n        \r\n        <!-- KPI value and unit -->\r\n        <p><span [style.color] = \"getKPIColor()\" [style.font-size] = \"getKPISize()\" style=\"font-weight: bold;\">{{getKPIValue()}} </span> <span [style.color] = \"getUnitColor()\" [style.font-size] = \"getUnitSize()\">{{getKPIUnit()}}</span></p>\r\n    </div>\r\n</div>\r\n</ng-container>\r\n<hr style = \"border: 1px solid grey; margin-left:15px; margin-right: 15px;\">\r\n    <div style=\"padding-left:15px; padding-right: 15px;\">\r\n        <!-- KPI text     -->\r\n         <p [style.color] = \"getMessageColor()\" [style.font-size] = \"getMessageSize()\"><span style=\"white-space: wrap; overflow: hidden; text-overflow: ellipsis;\">{{getKPIMessage()}}</span></p>\r\n\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpKpiOverviewWidgetComponent.ctorParameters = () => [
    { type: GpKpiOverviewWidgetService }
];
GpKpiOverviewWidgetComponent.propDecorators = {
    config: [{ type: Input }]
};

/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
// tslint:disable-next-line: max-line-length
const previewImage = 'data:image/png;base64,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a+gskxlTFKUULFquuGbarT0CIh1iFzgJOd9ZvzVyUxw3RrJZxKVN7fp0foffV3eufwm52S6YS27S1lHM3bhx48svv6yurvb09Dx58uTAgQMXL15MqUdFZXx8fFJSUkhICDvMaN68eZSVtra2p0+fphycMWPGq6++SrlZXl5+4MABmvLWW28VFxefOHGConPVqlWUsBS+f/nLXyhVY2Ji3N3d23qLnyoNT0abwmOR4FBkJ47XibdCbkoKVw2uVA8/NfH6Je1w1AxKb/wScvOZZS65KZPJrl69SrnWo0cPKgapirx79y4l4HPPPUfhSEUi5d3MmTPt7OwoUikE09PTP/zww4CAAHojRS37+0IDBgyg2T799NOuXbuy4z3//ve/05RPPvnEwcGBZqDwnT179vz589FP19bgZDRLeavg5Q7eLnbKmxJJKq4llq1eW9NgHv3D443ROZ++MrHXEq/HXnsjIWiQ9iAh3ahFbrYLZpGbVVVVd+7cWbly5aBBg8LDwx0dHalUlEgkL774IgUlezqIilDqudO+oG47zX/48OEzZ85ERUVRR56Kyri4OMpEys3CwkIqNmnmv/3tbxUVFevWrausrPz888+pU0+d948//nj06NHU36dFtPVGPz10TkazgtY7bms0Il2efn9quG682lvvSnMN4FBz6o7fbJEIeMzcbBBqyM12wSxykyJy//79W7du/eabb/r160fdbePzU/mZn5+/cOHCESNGUA7u3LmzT58+VKsKBALqpycnJ3/22WdBQUFyufzXX3+dPHnynDlzLC0tKVIpTKn8pGB1c3MzbdXMwJ0H4eM1txpSoRIss7ufnmOXOjfXYDU8r9KUlr9eqBm5WfMwekA5crMdM4vcLC0tpZrxX//6F3W3KdE0443Yex1RSlpZWbFngTTT6S3z5s2jcBw8ePCuXbuow/7aa6/RPLSzioqKTp48+e2339K7IiIixowZQyWqXIVyk4I1OjqaOvJtvdFPjdS8Aa/rXj1pOH30XJG5THB5JYdL/Zp/fXphweLh9eMcd/3uGsAmu/bxTTfbQ2dcmh5lhuOb7V37z032jND//ve/wMDAxMREykH24CNNl8lkVDDeu3evc+fO/v7+1Gdnr/apqam5ffv2+PHjv/zyS+raf/fdd3v37qUueZcuXSh2hUKdTyI1LhaLMzIycnJy9u3bFxIS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';

/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
class GpKpiOverviewWidgetConfigComponent {
    constructor() {
        this.config = {};
        this.kpiColorPickerClosed = true;
        this.kpiBgColorPickerClosed = true;
        this.titleColorPickerClosed = true;
        this.kpiUnitColorPickerClosed = true;
        this.messageColorPickerClosed = true;
        this.widgetInfo = {
            metadata: {
                title: '',
                icon: '',
            },
            kpi: {
                color: '#b0b0b0',
                unit: '',
                bgcolor: '#FFFFFF',
                kpiName: '',
                message: '',
                otherKPIValue: '',
                otherKPIName: '',
                titleColor: '#808080',
                unitColor: '#b0b0b0',
                messageColor: '#808080',
                titleSize: 20,
                messageSize: 10,
                unitSize: 20,
                kpiSize: 30,
                imageSize: 60,
            }
        };
        this.kpiNamesList = [
            {
                id: 'totalDevices',
                text: 'Total Devices'
            },
            {
                id: 'available',
                text: 'Available Devices'
            },
            {
                id: 'unavailable',
                text: 'Unavailable Devices'
            },
            {
                id: 'totalAlarms',
                text: 'Total Alarms'
            },
            {
                id: 'major',
                text: 'Major Alarms'
            },
            {
                id: 'minor',
                text: 'Minor Alarms'
            },
            {
                id: 'critical',
                text: 'Critical Alarms'
            },
            {
                id: 'highRisk',
                text: 'High Risk'
            },
            {
                id: 'mediumRisk',
                text: 'Medium Risk'
            },
            {
                id: 'lowRisk',
                text: 'Low Risk'
            },
            {
                id: 'noRisk',
                text: 'No Risk'
            },
            {
                id: 'other',
                text: 'Other Property'
            }
        ];
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            // Editing an existing widget
            if (has(this.config, 'customwidgetdata')) {
                this.widgetInfo = get(this.config, 'customwidgetdata');
            }
            else { // Adding a new widget
                set(this.config, 'customwidgetdata', this.widgetInfo);
            }
        });
    }
    updateIconInConfig($event) {
        const kpiIcon = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(kpiIcon);
        reader.onload = () => {
            this.widgetInfo.metadata.icon = reader.result;
            set(this.config, 'customwidgetdata', this.widgetInfo);
        };
    }
    updateConfig() {
        set(this.config, 'customwidgetdata', this.widgetInfo);
    }
    setSelectedColorForKPI(value) {
        this.widgetInfo.kpi.color = value;
        this.updateConfig();
    }
    closeKPIColorPicker() {
        this.kpiColorPickerClosed = true;
    }
    openKPIColorPicker() {
        this.kpiColorPickerClosed = false;
    }
    setSelectedColorForTitle(value) {
        this.widgetInfo.kpi.titleColor = value;
        this.updateConfig();
    }
    closeTitleColorPicker() {
        this.titleColorPickerClosed = true;
    }
    openTitleColorPicker() {
        this.titleColorPickerClosed = false;
    }
    setSelectedColorForKPIUnit(value) {
        this.widgetInfo.kpi.unitColor = value;
        this.updateConfig();
    }
    closeKPIUnitColorPicker() {
        this.kpiUnitColorPickerClosed = true;
    }
    openKPIUnitColorPicker() {
        this.kpiUnitColorPickerClosed = false;
    }
    setSelectedColorForMessage(value) {
        this.widgetInfo.kpi.messageColor = value;
        this.updateConfig();
    }
    closeMessageColorPicker() {
        this.messageColorPickerClosed = true;
    }
    openMessageColorPicker() {
        this.messageColorPickerClosed = false;
    }
    closeKPIBgColorPicker() {
        this.kpiBgColorPickerClosed = true;
    }
    openKPIBgColorPicker() {
        this.kpiBgColorPickerClosed = false;
    }
    setSelectedColorForBackground(value) {
        this.widgetInfo.kpi.bgcolor = value;
        this.updateConfig();
    }
}
GpKpiOverviewWidgetConfigComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-gp-kpi-overview-widget-config',
                template: "\r\n<c8y-form-group>\r\n\r\n    <div class=\"row d-flex\">\r\n\r\n      <div class=\"col-md-7\">\r\n       <!-- KPI title -->\r\n      <label for=\"kpi-title\" >KPI title</label>\r\n      <input type=\"text\" name=\"kpi-title\" id=\"kpi-title\" [(ngModel)]=\"widgetInfo.metadata.title\" class=\"form-control\" (change)=\"updateConfig()\" />\r\n      </div>\r\n\r\n      <div class=\"col-md-3\">\r\n        <label for=\"slider1\">Title Font Size</label>\r\n        <input id=\"slider1\" [(ngModel)]=\"widgetInfo.kpi.titleSize\" type=\"range\" min=\"10\" max=\"80\" step=\"0\"/>\r\n      </div>\r\n      <div class=\"col-md-2\">\r\n        <output style=\"margin-top: 30px;\">{{widgetInfo.kpi.titleSize}}</output>\r\n      </div>\r\n  </div>\r\n      <!-- Upload icon-->\r\n  <div class=\"row d-flex\" style=\"margin-top: 25px;\">\r\n    <div class=\"col-md-7\">\r\n\r\n      <label for=\"kpi-icon\" >\r\n            Upload KPI icon      \r\n      </label>\r\n      <input type=\"file\" name=\"kpi-icon\" class=\"form-control\" alt=\"Icon\" (change)=\"updateIconInConfig($event)\" />\r\n    </div>\r\n    <div class=\"col-md-3\">\r\n      <label for=\"slider5\">Image Size</label>\r\n      <input id=\"slider5\" [(ngModel)]=\"widgetInfo.kpi.imageSize\" type=\"range\" min=\"20\" max=\"200\" step=\"0\" /> \r\n    </div>\r\n    <div class=\"col-md-2\">\r\n      <output style=\"margin-top: 30px;\">{{widgetInfo.kpi.imageSize}} x {{widgetInfo.kpi.imageSize}}</output>\r\n    </div>\r\n  </div>\r\n    \r\n    <div class=\"row d-flex\" style=\"margin-top: 25px;\">\r\n      <div class=\"col-md-7\">\r\n        <!-- KPI Name -->\r\n    <label for=\"kpiName\" >\r\n      KPI \r\n    </label>\r\n      <ng-container>\r\n      <ng-select [items]=\"kpiNamesList\" [multiple]=\"false\" bindLabel=\"text\"\r\n               bindValue=\"id\"\r\n               [closeOnSelect]=\"true\"\r\n               [(ngModel)]=\"widgetInfo.kpi.kpiName\"\r\n               (ngModelChange)=\"updateConfig()\"\r\n               placeHolder = 'select KPI'>\r\n        <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n            <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.text}}\r\n        </ng-template>\r\n      </ng-select>\r\n      </ng-container>\r\n\r\n    </div>\r\n      <div class=\"col-md-3\">\r\n          <label for=\"slider2\">KPI Font Size</label>\r\n          <input id=\"slider2\" [(ngModel)]=\"widgetInfo.kpi.kpiSize\" type=\"range\" min=\"20\" max=\"80\" step=\"0\" /> \r\n      </div>\r\n      <div class=\"col-md-2\">\r\n        <output style=\"margin-top: 30px;\">{{widgetInfo.kpi.kpiSize}}</output>\r\n      </div>\r\n    </div>\r\n    \r\n      <div *ngIf=\"widgetInfo.kpi.kpiName == 'other'\" class=\"row d-flex\" style=\"margin-top: 25px;\">\r\n        <b>Since you selected Other, property name and value must be entered </b>\r\n        <br />\r\n        <div class=\"col-md-8\">\r\n          <label>Property Name </label>\r\n          <input type=\"text\" class=\"form-control input-width\" placeholder=\"eg. c8y_Position\"\r\n            [(ngModel)]=\"widgetInfo.kpi.otherKPIName\" id=\"label\">\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n          <label> Property Metric </label>\r\n          <select class=\"form-control input-width\" id=\"otherKPIValue\" [(ngModel)]=\"widgetInfo.kpi.otherKPIValue\" name=\"otherKPIValue\">\r\n              <option selected value=\"count\">Count</option>\r\n              <option value=\"value\">Value</option>\r\n            </select>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row d-flex\" style=\"margin-top: 25px;\">\r\n        <div class=\"col-md-7\">\r\n              <!-- KPI Unit -->\r\n          <label for=\"kpi-unit\">KPI unit (optional) (eg: km, g)</label>\r\n          <input type=\"text\" name=\"kpi-unit\" id=\"kpi-unit\" [(ngModel)]=\"widgetInfo.kpi.unit\" class=\"form-control\" (change)=\"updateConfig()\" />\r\n        \r\n        </div>\r\n        <div class=\"col-md-3\">\r\n\r\n          <label for=\"slider3\">Unit Font Size</label>\r\n          <input id=\"slider3\" [(ngModel)]=\"widgetInfo.kpi.unitSize\" type=\"range\" min=\"20\" max=\"80\" step=\"0\" />\r\n\r\n        </div>\r\n        <div class=\"col-md-2\">\r\n          <output style=\"margin-top: 30px;\">{{widgetInfo.kpi.unitSize}}</output>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row d-flex\" style=\"margin-top: 25px;\">\r\n        <div class=\"col-md-7\">\r\n          <!-- KPI Message -->\r\n          <label for=\"kpi-message\">KPI Message (optional)</label>\r\n          <input type=\"text\" name=\"kpi-message\" id=\"kpi-message\" [(ngModel)]=\"widgetInfo.kpi.message\" class=\"form-control\" (change)=\"updateConfig()\" />\r\n          \r\n        </div>\r\n        <div class=\"col-md-3\">\r\n          <label for=\"slider4\">Message Font Size</label>\r\n          <input id=\"slider4\" [(ngModel)]=\"widgetInfo.kpi.messageSize\" type=\"range\" min=\"10\" max=\"50\" step=\"0\" />\r\n        </div>\r\n        <div class=\"col-md-2\">\r\n          <output style=\"margin-top: 30px;\">{{widgetInfo.kpi.messageSize}}</output>\r\n        </div>\r\n      </div>\r\n\r\n\r\n    <div class=\"row d-flex\" >\r\n      <div class=\"col-md-6\">\r\n\r\n        <!-- KPI color -->\r\n        <label for=\"kpi-color\" style=\"margin-top: 25px;\">\r\n            KPI color (in hex)\r\n            </label>\r\n        <input type=\"text\" class=\"form-control\" id=\"kpi-color\" name=\"kpi-color\" [(ngModel)]=\"widgetInfo.kpi.color\" (change)=\"updateConfig()\" (click)=\"openKPIColorPicker()\" />\r\n        <app-color-picker [ngClass]=\"kpiColorPickerClosed? 'hideColorPicker' : 'showColorPicker'\" (colorPickerClosed)=\"closeKPIColorPicker()\" (colorSet)=\"setSelectedColorForKPI($event)\" ></app-color-picker>\r\n      </div>\r\n      <div class=\"col-md-6\">  \r\n        <!-- KPI Title color -->\r\n        <label for=\"title-color\" style=\"margin-top: 25px;\">\r\n          Title color (in hex)\r\n          </label>\r\n        <input type=\"text\" class=\"form-control\" id=\"title-color\" name=\"title-color\" [(ngModel)]=\"widgetInfo.kpi.titleColor\" (change)=\"updateConfig()\" (click)=\"openTitleColorPicker()\" />\r\n        <app-color-picker [ngClass]=\"titleColorPickerClosed? 'hideColorPicker' : 'showColorPicker'\" (colorPickerClosed)=\"closeTitleColorPicker()\" (colorSet)=\"setSelectedColorForTitle($event)\" ></app-color-picker>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row d-flex\">\r\n      <div class=\"col-md-6\">\r\n        <!-- KPI Unit color -->\r\n        <label for=\"kpi-unit-color\" style=\"margin-top: 25px;\">\r\n          KPI Unit color (in hex)\r\n          </label>\r\n        <input type=\"text\" class=\"form-control\" id=\"kpi-unit-color\" name=\"kpi-unit-color\" [(ngModel)]=\"widgetInfo.kpi.unitColor\" (change)=\"updateConfig()\" (click)=\"openKPIUnitColorPicker()\" />\r\n        <app-color-picker [ngClass]=\"kpiUnitColorPickerClosed? 'hideColorPicker' : 'showColorPicker'\" (colorPickerClosed)=\"closeKPIUnitColorPicker()\" (colorSet)=\"setSelectedColorForKPIUnit($event)\" ></app-color-picker>\r\n      </div>\r\n      <div class=\"col-md-6\">    \r\n        <!-- KPI Message color -->\r\n        <label for=\"message-color\" style=\"margin-top: 25px;\">\r\n          Message color (in hex)\r\n          </label>\r\n        <input type=\"text\" class=\"form-control\" id=\"message-color\" name=\"message-color\" [(ngModel)]=\"widgetInfo.kpi.messageColor\" (change)=\"updateConfig()\" (click)=\"openMessageColorPicker()\" />\r\n        <app-color-picker [ngClass]=\"messageColorPickerClosed? 'hideColorPicker' : 'showColorPicker'\" (colorPickerClosed)=\"closeMessageColorPicker()\" (colorSet)=\"setSelectedColorForMessage($event)\" ></app-color-picker>\r\n      \r\n      </div>\r\n    </div>\r\n\r\n     <!-- KPI Background color -->\r\n   <!--        <label for=\"kpi-bgcolor\" style=\"margin-top: 25px;\">\r\n            Background color (in hex)\r\n            </label>\r\n    <input type=\"text\" class=\"form-control\" id=\"kpi-bgcolor\" name=\"kpi-bgcolor\" [(ngModel)]=\"widgetInfo.kpi.bgcolor\" (change)=\"updateConfig()\" (click)=\"openKPIBgColorPicker()\" />\r\n    <app-color-picker [ngClass]=\"kpiBgColorPickerClosed? 'hideColorPicker' : 'showColorPicker'\" (colorPickerClosed)=\"closeKPIBgColorPicker()\" (colorSet)=\"setSelectedColorForBackground($event)\" ></app-color-picker>\r\n  -->\r\n\r\n</c8y-form-group>",
                styles: [".showColorPicker{display:block}.hideColorPicker{display:none}"]
            },] }
];
GpKpiOverviewWidgetConfigComponent.ctorParameters = () => [];
GpKpiOverviewWidgetConfigComponent.propDecorators = {
    config: [{ type: Input }]
};

/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ColorPickerComponent {
    constructor(eRef) {
        this.eRef = eRef;
        this.colorSet = new EventEmitter(true);
        this.colorPickerClosed = new EventEmitter();
        this.colorType = 'hexa';
    }
    closeColorPicker() {
        this.colorPickerClosed.emit(true);
    }
    applyColorClicked() {
        if (this.color !== undefined) {
            if (this.colorType === 'hexa') {
                this.colorSet.emit(this.RGBAToHexA(this.color));
            }
            else {
                this.colorSet.emit(this.color);
            }
        }
    }
    RGBAToHexA(rgba) {
        const sep = rgba.indexOf(',') > -1 ? ',' : ' ';
        rgba = rgba.substr(5).split(')')[0].split(sep);
        // Strip the slash if using space-separated syntax
        if (rgba.indexOf('/') > -1) {
            rgba.splice(3, 1);
        }
        let r = (+rgba[0]).toString(16);
        let g = (+rgba[1]).toString(16);
        let b = (+rgba[2]).toString(16);
        let a = Math.round(+rgba[3] * 255).toString(16);
        if (r.length === 1) {
            r = '0' + r;
        }
        if (g.length === 1) {
            g = '0' + g;
        }
        if (b.length === 1) {
            b = '0' + b;
        }
        if (a.length === 1) {
            a = '0' + a;
        }
        return '#' + r + g + b + a;
    }
}
ColorPickerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'app-color-picker',
                template: "<!--<mat-radio-group aria-label=\"Select an option\" (change) =\"colorType = $event.value\" >\n  <mat-radio-button   value=\"rgba\">RGBA</mat-radio-button>\n  <mat-radio-button checked=\"true\" value=\"hexa\">HEXA</mat-radio-button>\n</mat-radio-group>-->\n<div class=\"color-wrapper\">\n    <app-color-palette [hue]=\"hue\" (color)=\"color = $event\" ></app-color-palette> \n    <app-color-slider\n      (color)=\"hue=$event\"\n      style=\"margin-left:16px\"\n    ></app-color-slider>\n    <div class = \"colorPickerFooter\">\n      <button class=\"btn btn-primary\" (click)=\"applyColorClicked()\" style=\"margin-bottom: 10px;\">\n        Apply\n      </button>\n      <button class=\"btn btn-default\" (click)=\"closeColorPicker()\">\n        Close\n      </button>\n    </div>\n  </div>\n  \n\n\n  ",
                styles: [".btn{min-width:100%;margin-left:0!important}:host{display:block;width:316px;padding:16px}.color-wrapper{display:flex;height:150px}.input-wrapper{margin-top:16px;display:flex;border-radius:1px;border:1px solid #dcdcdc;padding:8px;height:32px;justify-content:center}.color-div{width:32px;height:32px;border-radius:50%;border:1px solid #dcdcdc}.text{flex:1;font-family:Helvetica;line-height:32px}.colorPickerFooter{padding:14px;text-align:center;box-shadow:inset 0 1px 0 rgba(0,0,0,.05)}"]
            },] }
];
ColorPickerComponent.ctorParameters = () => [
    { type: ElementRef }
];
ColorPickerComponent.propDecorators = {
    colorSet: [{ type: Output }],
    colorPickerClosed: [{ type: Output }]
};

/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ColorSliderComponent {
    constructor() {
        this.color = new EventEmitter(true);
        this.mousedown = false;
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit() {
        this.draw();
    }
    onMouseDown(evt) {
        this.mousedown = true;
        this.selectedHeight = evt.offsetY;
        this.draw();
        this.emitColor(evt.offsetX, evt.offsetY);
    }
    onMouseMove(evt) {
        if (this.mousedown) {
            this.selectedHeight = evt.offsetY;
            this.draw();
            this.emitColor(evt.offsetX, evt.offsetY);
        }
    }
    onMouseUp(evt) {
        this.mousedown = false;
    }
    emitColor(x, y) {
        const rgbaColor = this.getColorAtPosition(x, y);
        this.color.emit(rgbaColor);
    }
    getColorAtPosition(x, y) {
        const imageData = this.ctx.getImageData(x, y, 1, 1).data;
        return ('rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)');
    }
    draw() {
        if (!this.ctx) {
            this.ctx = this.canvas.nativeElement.getContext('2d');
        }
        const width = this.canvas.nativeElement.width;
        const height = this.canvas.nativeElement.height;
        this.ctx.clearRect(0, 0, width, height);
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this.ctx.beginPath();
        this.ctx.rect(0, 0, width, height);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath();
        if (this.selectedHeight) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 5;
            this.ctx.rect(0, this.selectedHeight - 5, width, 10);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}
ColorSliderComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'app-color-slider',
                template: "<canvas #canvas class=\"color-slider\" width=\"25\" height=\"150\"  (mousedown)=\"onMouseDown($event)\"\n(mousemove)=\"onMouseMove($event)\"> </canvas>"
            },] }
];
ColorSliderComponent.propDecorators = {
    color: [{ type: Output }],
    canvas: [{ type: ViewChild, args: ['canvas', { static: true },] }],
    onMouseUp: [{ type: HostListener, args: ['window:mouseup', ['$event'],] }]
};

/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ColorPaletteComponent {
    constructor() {
        this.color = new EventEmitter(true);
        this.mousedown = false;
    }
    ngAfterViewInit() {
        this.draw();
    }
    draw() {
        if (!this.ctx) {
            this.ctx = this.canvas.nativeElement.getContext('2d');
        }
        const width = this.canvas.nativeElement.width;
        const height = this.canvas.nativeElement.height;
        this.ctx.fillStyle = this.hue || 'rgba(255,255,255,1)';
        this.ctx.fillRect(0, 0, width, height);
        const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0);
        whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
        whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx.fillStyle = whiteGrad;
        this.ctx.fillRect(0, 0, width, height);
        const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height);
        blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
        blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx.fillStyle = blackGrad;
        this.ctx.fillRect(0, 0, width, height);
        if (this.selectedPosition) {
            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, 10, 0, 2 * Math.PI);
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    }
    ngOnChanges(changes) {
        // tslint:disable-next-line: no-string-literal
        if (changes['hue']) {
            this.draw();
            const pos = this.selectedPosition;
            if (pos) {
                this.color.emit(this.getColorAtPosition(pos.x, pos.y));
            }
        }
    }
    onMouseUp(evt) {
        this.mousedown = false;
    }
    onMouseDown(evt) {
        this.mousedown = true;
        this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
        this.draw();
        this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY));
    }
    onMouseMove(evt) {
        if (this.mousedown) {
            this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
            this.draw();
            this.emitColor(evt.offsetX, evt.offsetY);
        }
    }
    emitColor(x, y) {
        const rgbaColor = this.getColorAtPosition(x, y);
        this.color.emit(rgbaColor);
    }
    getColorAtPosition(x, y) {
        const imageData = this.ctx.getImageData(x, y, 1, 1).data;
        return ('rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)');
    }
}
ColorPaletteComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'app-color-palette',
                template: "<canvas\n  #canvas\n  class=\"color-palette\"\n  width=\"150\"\n  height=\"150\"\n  (mousedown)=\"onMouseDown($event)\"\n  (mousemove)=\"onMouseMove($event)\"\n>\n</canvas>",
                styles: [".color-palette:hover{cursor:pointer}:host{width:150px;height:150px;display:block}"]
            },] }
];
ColorPaletteComponent.propDecorators = {
    hue: [{ type: Input }],
    color: [{ type: Output }],
    canvas: [{ type: ViewChild, args: ['canvas', { static: true },] }],
    onMouseUp: [{ type: HostListener, args: ['window:mouseup', ['$event'],] }]
};

/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ɵ0 = {
    id: 'kpi-overview.widget',
    label: 'KPI Overview',
    previewImage: previewImage,
    description: 'KPI Overview',
    component: GpKpiOverviewWidgetComponent,
    configComponent: GpKpiOverviewWidgetConfigComponent,
    data: {
        ng1: {
            options: {
                noDeviceTarget: false,
                noNewWidgets: false,
                deviceTargetNotRequired: false,
                groupsSelectable: true
            }
        }
    }
};
class GpKpiOverviewWidgetModule {
}
GpKpiOverviewWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GpKpiOverviewWidgetComponent,
                    GpKpiOverviewWidgetConfigComponent,
                    ColorPickerComponent,
                    ColorSliderComponent,
                    ColorPaletteComponent
                ],
                imports: [
                    NgSelectModule,
                    FormsModule,
                    CommonModule,
                    CoreModule
                ],
                exports: [GpKpiOverviewWidgetComponent, GpKpiOverviewWidgetConfigComponent],
                entryComponents: [GpKpiOverviewWidgetComponent, GpKpiOverviewWidgetConfigComponent],
                providers: [
                    GpKpiOverviewWidgetService,
                    {
                        provide: HOOK_COMPONENTS,
                        multi: true,
                        useValue: ɵ0
                    }
                ],
            },] }
];

/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GpKpiOverviewWidgetComponent, GpKpiOverviewWidgetModule, GpKpiOverviewWidgetService, ɵ0, GpKpiOverviewWidgetConfigComponent as ɵa, ColorPickerComponent as ɵb, ColorSliderComponent as ɵc, ColorPaletteComponent as ɵd, previewImage as ɵe };
//# sourceMappingURL=custom-widget.js.map
