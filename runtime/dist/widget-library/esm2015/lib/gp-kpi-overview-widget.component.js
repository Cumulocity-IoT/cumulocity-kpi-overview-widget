import { __awaiter } from "tslib";
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
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { GpKpiOverviewWidgetService } from './gp-kpi-overview-widget.service';
export class GpKpiOverviewWidgetComponent {
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
        this.device.id = _.get(this.config, 'device.id');
        if (this.device.id === undefined || this.device.id.length === 0) {
        }
        // Get KPI Title
        this.kpi.title = _.get(this.config, 'customwidgetdata.metadata.title');
        if (this.kpi.title === undefined || this.kpi.title.length === 0) {
            this.kpi.title = 'Default Title';
        }
        // Get KPI Name
        this.kpi.kpiName = _.get(this.config, 'customwidgetdata.kpi.kpiName');
        if (this.kpi.kpiName === undefined || this.kpi.kpiName.length === 0) {
            this.kpi.kpiName = 'totalDevices';
        }
        // Get KPI Icon
        this.kpi.icon = _.get(this.config, 'customwidgetdata.metadata.icon');
        if (this.kpi.icon === undefined || this.kpi.icon.length === 0) {
            this.kpi.icon = 'data:image/png;base64,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';
        }
        // Get KPI Message
        this.kpi.message = _.get(this.config, 'customwidgetdata.kpi.message');
        if (this.kpi.message === undefined || this.kpi.message.length === 0) {
            this.kpi.message = '';
        }
        // Get KPI Color
        this.kpi.default.color = _.get(this.config, 'customwidgetdata.kpi.color');
        if (this.kpi.default.color === undefined || this.kpi.default.color.indexOf('#') !== 0) {
            this.kpi.default.color = '#b0b0b0';
        }
        this.kpi.color = this.kpi.default.color;
        // Get Bg KPI Color
        this.kpi.default.bgcolor = _.get(this.config, 'customwidgetdata.kpi.bgcolor');
        if (this.kpi.default.bgcolor === undefined || this.kpi.default.bgcolor.indexOf('#') !== 0) {
            this.kpi.default.bgcolor = '#FFFFFF';
        }
        this.kpi.bgcolor = this.kpi.default.bgcolor;
        // Get Title Color
        this.kpi.titleColor = _.get(this.config, 'customwidgetdata.kpi.titleColor');
        if (this.kpi.titleColor === undefined || this.kpi.titleColor.indexOf('#') !== 0) {
            this.kpi.titleColor = '#b0b0b0';
        }
        // Get Unit Color
        this.kpi.unitColor = _.get(this.config, 'customwidgetdata.kpi.unitColor');
        if (this.kpi.unitColor === undefined || this.kpi.unitColor.indexOf('#') !== 0) {
            this.kpi.unitColor = '#b0b0b0';
        }
        // Get message Color
        this.kpi.messageColor = _.get(this.config, 'customwidgetdata.kpi.messageColor');
        if (this.kpi.messageColor === undefined || this.kpi.messageColor.indexOf('#') !== 0) {
            this.kpi.messageColor = '#808080';
        }
        // Get KPI Unit
        this.kpi.unit = _.get(this.config, 'customwidgetdata.kpi.unit');
        this.kpi.titleSize = _.get(this.config, 'customwidgetdata.kpi.titleSize');
        this.kpi.kpiSize = _.get(this.config, 'customwidgetdata.kpi.kpiSize');
        this.kpi.unitSize = _.get(this.config, 'customwidgetdata.kpi.unitSize');
        this.kpi.messageSize = _.get(this.config, 'customwidgetdata.kpi.messageSize');
        this.kpi.imageSize = _.get(this.config, 'customwidgetdata.kpi.imageSize');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ncC1rcGktb3ZlcnZpZXctd2lkZ2V0L3NyYy9saWIvZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQXVDOUUsTUFBTSxPQUFPLDRCQUE0QjtJQW1DdkMsWUFBb0IsVUFBc0M7UUFBdEMsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7UUEvQmxELFdBQU0sR0FBVztZQUN2QixFQUFFLEVBQUUsRUFBRTtTQUNQLENBQUE7UUFFTyxRQUFHLEdBQVE7WUFDakIsS0FBSyxFQUFFLEVBQUU7WUFDVCxTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1lBQ2QsWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsY0FBYyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLEVBQUU7WUFDYixlQUFlLEVBQUUsRUFBRTtZ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WTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRU0sa0JBQWtCO1FBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JEO2FBQU0sSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDdEQ7YUFBSTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7OztZQS9TRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsbStDQUE0QzthQUU3Qzs7O1lBdENRLDBCQUEwQjs7O3FCQXlDaEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDIwIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgR3BLcGlPdmVydmlld1dpZGdldFNlcnZpY2UgfSBmcm9tICcuL2dwLWtwaS1vdmVydmlldy13aWRnZXQuc2VydmljZSc7XG5cblxuaW50ZXJmYWNlIERldmljZSB7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBLUEkge1xuICBkZWZhdWx0OiB7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBiZ2NvbG9yOiBzdHJpbmdcbiAgfVxuICB0aXRsZTogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG4gIHRvcE1hcmdpbjogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xuICBiZ2NvbG9yOiBzdHJpbmc7XG4gIHVuaXRDb2xvcjogc3RyaW5nO1xuICB0aXRsZUNvbG9yOiBzdHJpbmc7XG4gIG1lc3NhZ2VDb2xvcjogc3RyaW5nO1xuICB2YWx1ZTogYW55O1xuICB1bml0OiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAga3BpTmFtZTogc3RyaW5nO1xuICBvdGhlcktQSU5hbWU6IHN0cmluZztcbiAgb3RoZXJLUElNZXRyaWM6IHN0cmluZztcbiAgdGl0bGVTaXplOiBudW1iZXI7XG4gIG1lc3NhZ2VTaXplOiBudW1iZXI7XG4gIGtwaVNpemU6IG51bWJlcjtcbiAgdW5pdFNpemU6IG51bWJlcjtcbiAgaW1hZ2VTaXplOiBudW1iZXI7XG4gIGNvbnRhaW5lckhlaWdodDogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncC1rcGktb3ZlcnZpZXctd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEdwS3BpT3ZlcnZpZXdXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXR7XG5cbiAgQElucHV0KCkgY29uZmlnO1xuXG4gIHByaXZhdGUgZGV2aWNlOiBEZXZpY2UgPSB7XG4gICAgaWQ6ICcnXG4gIH1cblxuICBwcml2YXRlIGtwaTogS1BJID0ge1xuICAgIHRpdGxlOiAnJyxcbiAgICB0b3BNYXJnaW46ICcnLFxuICAgIGljb246ICcnLFxuICAgIHZhbHVlOiAwLFxuICAgIHVuaXQ6ICcnLFxuICAgIGNvbG9yOiAnJyxcbiAgICBiZ2NvbG9yOiAnJyxcbiAgICB1bml0Q29sb3I6ICcnLFxuICAgIHRpdGxlQ29sb3I6ICcnLFxuICAgIG1lc3NhZ2VDb2xvcjogJycsXG4gICAgb3RoZXJLUElOYW1lOiAnJyxcbiAgICBvdGhlcktQSU1ldHJpYzogJycsXG4gICAga3BpTmFtZTogJycsXG4gICAgbWVzc2FnZTogJycsXG4gICAgdGl0bGVTaXplOiAyMCxcbiAgICBtZXNzYWdlU2l6ZTogMTAsXG4gICAga3BpU2l6ZTogMzAsXG4gICAgdW5pdFNpemU6IDIwLFxuICAgIGltYWdlU2l6ZTogNjAsXG4gICAgY29udGFpbmVySGVpZ2h0OiA4MCxcbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb2xvcjogJycsXG4gICAgICBiZ2NvbG9yOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga3BpU2VydmljZTogR3BLcGlPdmVydmlld1dpZGdldFNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIEdldCBEZXZpY2UgSWRcbiAgICAgICAgdGhpcy5kZXZpY2UuaWQgPSBfLmdldCh0aGlzLmNvbmZpZywgJ2RldmljZS5pZCcpO1xuICAgICAgICBpZih0aGlzLmRldmljZS5pZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuZGV2aWNlLmlkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBLUEkgVGl0bGVcbiAgICAgICAgdGhpcy5rcGkudGl0bGUgPSBfLmdldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEubWV0YWRhdGEudGl0bGUnKTtcbiAgICAgICAgaWYodGhpcy5rcGkudGl0bGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmtwaS50aXRsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmtwaS50aXRsZSA9ICdEZWZhdWx0IFRpdGxlJztcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgS1BJIE5hbWVcbiAgICAgICAgdGhpcy5rcGkua3BpTmFtZSA9IF8uZ2V0KHRoaXMuY29uZmlnLCAnY3VzdG9td2lkZ2V0ZGF0YS5rcGkua3BpTmFtZScpO1xuICAgICAgICBpZih0aGlzLmtwaS5rcGlOYW1lID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkua3BpTmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmtwaS5rcGlOYW1lID0gJ3RvdGFsRGV2aWNlcyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IEtQSSBJY29uXG4gICAgICAgIHRoaXMua3BpLmljb24gPSBfLmdldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEubWV0YWRhdGEuaWNvbicpO1xuICAgICAgICBpZih0aGlzLmtwaS5pY29uID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkuaWNvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmtwaS5pY29uID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTWdBQUFESUNBWUFBQUN0V0s2ZUFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFEbWxKUkVGVWVKenQzWHV3VldVWngvSHZBeWdJQWlFa2FFaDRpOHd1WmxKcU4wMXIwbVN5VW5PNjZtU1dXUlk1T1RwT3QzRnlTc01hcld6VTFNbHBNdlBDNUdVU0swM1VzcUZFU3ZFQ21sZklRSlFFUEhBNHF6OFdSdy9IdmM5ZTcxbVg1MTE3L1Q0ejd6K2J6VG0vOWU3OW5QWHV2ZGI3dmlBaUlpSWlJaUlpSWlJaUlpSWlqV1BlQVVTR2FUSXdCUmdMOUFCcmdKVkE0aGxLeE1zZXdPa1lDekJXWVNRdDJqcU11ekhPQmQ2RFRnRFNBSWRqM042bUlEcTFSNEc1d0Rqdmd4QXAybDRZdHc2ek1BYTNwNEJQZUIrUVNGRk94TmhRVUhFTWJGY0JFNzBQVG1TNERHTmVDWVV4c1AwVG1PNTlvQ0xoalBOTExvNyt0aHpZeWZ0d1JVTE1yYWc0K3R0aVlEdnZneGJKWWpiR3hvb0xKTUc0eVB2QVJUb1ppYkhZb1RqU0JnZDVkNERJVUU1d0s0NjAzWU11S0Vxa1JtQXNjeTZRQkRpaWZVQVJQNGNBdTN1SHdQaDh1MzlTZ1lnZjQxanZDRnNjQm94djlROHFFUEYwcUhlQUxiYWh6WWQxRlloNG1RYk04QTd4RW1PL1ZnK3JRTVRMNjcwRERES3IxWU1xRVBFeXpUdkFJRk5hUGFnQ0VTL2Jld2NZcEdVZUZZaDRpVzFxN0laV0Q2cEF4TXR6M2dFR1dkUHFRUldJZUhuTU84QWd5MXM5cUFJUkwwdUJ6ZDRoWHBLd3BOWERLaER4c2c1WTdCMWlnRnRiUGFnQ0VVODNlZ2ZZWWhId1pLdC9VSUdJbjRSZkVjTzNXUW0vOUk0ZzBwcHhrL1B0N3F2UXVsa1NzZGtZZlk1elFiN3UzUUVpUXpNdWRpcVFKY0FvNzhNWDZXUUN4c01WRjhjNjRBM2VCeTZTMWQ0WXoxVlVISnVCajNnZnNFaW9BekdlTDdrNGVvSGp2QTlVWkxqZWpQSHZrb3JqT1laWW9FR2tMaVpSL0ZwWkM0SGR2QTlNcEFpRzhWUkJoZkVnOENudkF4SXAwZ0U1aStKNTBxME81cER6YmhGOUJ5enhNVDRXOE93RndIM0FXaEllQWU0SDdpR21PNFZGQ21Vc3ozaW02QU4yOW80clVxVjlBb1pTZDVZZFJuZnpTbHlNajJaK2JzSzFKU1lSaVpCeFgrWXpDTXowaml0U3BWa0J3NnUvVnhGSVF5eUppWVpYSW0wWml3S0dWN0V0WFNwU3Foa0J3NnY3cWdxbElaYkVJdnZ3Q2cydnBHbU0yd09HVi90NHh4V3AwbFNNelJrTHBPVUtpR1hSRUV0aWNDVFozNHZYbEJsRUpEN0d6UUhEcS8yOTQ0cFVhUkxHeG93RjhpUVY3Mm11SVpaNG0wTzZpV1lXMXhMRFNvd2lsVEhtQnd5dkR2S09LMUtsY1Jqck14YklNOERJcWdOcWlDV2VEZ2UyeS9qYytUak1FdFNVMjg0bWsrNkF1aDNRUTdwVjEwclhSTjFDY3o5cWFRL2dkSXdGR0t2YW5PNy9oM0VueHZlQTJkNkJhMm8weHRxTXc2czFaUDhnTHlVNVBPaDJoMWZlUEhjOGVoRkRIQkhRdjlxL3c5RmVHTGNPc3pBR3QvdUJnNzBQcUJhTVN3Tyt2ZnF3ZDl5bU9oRmpRMEhGMGQvNk1INkFQdDhOWmVRUXc5ZkI3UVZnakhmZ3BqR01lUVVYeHVCMlBkbS9vV21hOXdYMDQxWGVZWnZIT0wvazR1aHZ0d0RiZWg5dWRJeWZCZ3l2UHU0ZHQybm1WbFFjL2UweTd3T09UTWk2dXk4QzIzc0hicExaWkw4eHJyZ0duL1UrOElpRXJMdjdPKyt3VFRLUzRwZlV6OXFlSmIzWUtNWVA5WWNsVGljNEZVZC91OEM3QTZLUWZkM2RqY0FrNzdoTk1RSmptWE9CYkFDbWVuZUVzNUIxZHhkNGg0WG0zS3g0Q0xDN2M0WXhOSDBqbDdCN3J6UzF0akxHTDV6UEh2MXRrWGRYdU1xKzd1NW1kTGF0a1BGWUJNWFIvOEx2NE4wZFRrTFczYjNkTzJ5L0pneXhwZ0V6dkVOc01ZTG0zdjFieStGVkV3b2t0alZjWjNrSGNKRjlXN1dFaUZaT2JFS0JUUE1Pc0JXTExFODFaZ0J2eS9qY1JjQVRKV1lKMG9RQ2llMVdoZkhlQVJ6VWNuZ0Z6U2lRMkphSmlTMVArY0oyclZXQlZPeFo3d0JiU1ZqdEhhRmlVNEVETXo1M0NiQ3N4Q3pCbWxBZ2ozb0hHT1FSN3dBVnk3N3Vib1FMTXpTaFFKYVNya1lTaTN1OEExUXE1T3A1Wk1PcjVqQnVpK0FpWVlLeGtvclhsblVXc3U3dWc5NWhXMm5DR1FRUzVudEgyR0kremZxUUhycnVyampaRWFQSC9RelN0S3ZvWWV2dTd1Y2R0OWxDbHBrcHIxMkF3L3F5VHNhUmZjV1lmM3VIRlppSjhXSUVSWElUemJoWWVIUkFuL3pJTzZ5a3ZoMUJnU1FZUzRqbkJzcHlHTC9PM0Ivd0x1KzRrdG9HNCs0SUNpVEJXQUc4M2J0RFNoS3k3dTRLbXZKbFVVMU14M2c2Z2dKSk1OWURSM2wzU0FsQzF0MzltWGRZR2N5NEpJTGk2Rzk5d0JuZVhWS29zSFYzRC9XT0sxdmJHNk0zZ3NJWTNDNmpPMVpoSEVYMmRYZFhveldNSXhPeTVmRHcydk01L3U5dDFIOUs3aUVCeDN1cGQxaloydUVsRnNZSzREaGdZczRpZkFqWTA3ZWJjZ2hiZC9jSTc3anlzbEVZUzBzb2pIOEFYd0xHRHZwZEYrYjRtYXVCOS9wMFV5NGg2KzZ1QlVaN0IrNmtTZU8va3dpYm4zNDFzQnJZRFpoQWVnVjhJN0FLZUpTRXhjQnQwUElxY0M4Skp3RVBZc3dqL0d2TUhUQVdrUEFGNFBMQS8rdHBmMkRuak0rOWdianVzbTYwU1JpckEvNkNyNlM0cTkxelNQYzBITzdaNUd6cWNnZHcyTHE3SWJNTXBWVEdqNFBlbEhCQ3dRbjJ3WGdpUjVIOGxqcHN4cE45M2QzMWJEMGtGVWV6Q052eVlESGxYTm5kQ1dOUmppSzVtOWhXYU5sYXlMcTd1clU5R3NiMWdXZVBNamZoSEl0eGJZNGllUXg0VTRuNWhzODRLNkNQUCtrZFYxTHZEM3dEVmpHeHlqRE95VkVrYTRIREtzZ1pKdnU2dXozQVJPKzRrbTZZODgrQU4xNFBzRWVGK1U1ZytMdGQ5UUpmcVRCckp5SHI3dDdrSFZaU1h3eDgwLzNRSWVQN01OYmtPSnZFTWdIcmpJRGgxZWU4dzBwNk5mdVpnRGZhZi9FNzdiK2VmSnY3K0UvQXl2N2xReS9haWk0Q3hybEJiN0wwSXFLbnlSZ0xjeFNKNXdTc0dRRTUvK1NVVVFiWW5iQUZHdjVGSE1PVWJUR3V5RkVrWGhPd3ZoYndoK2hraDN5eWxkQ3ZVZUVEM3BFSCtTWkczekNMcFBvSldOblBmSDFrdncxRlNuSlE0QnZxUnUvQWJSeEw5aFZCV3IwUnE1cUFOUlZqYzhaY2QxV1VTZG9ZZ1hGUHdCdHBFL0Z0cmpQUUFSai95VEhrcW1JQzFoY0N6dFNubHB4Rk92aGM0QnZvZk8vQUdjekUrRmVPSXJtTk1pZGdoY3g3Z1ptbDVaQ090c2RZRWZER1dVMTladTVOQ0hvanZyS1ZOUUVyWk4zZGY1VHcreVV6NCt5Z053MmM0aDA1VUl3VHNENFQwTjluRnZ5N0pjQnJDZnRBdTVUNlRoVDdHdGsvRkE5dVBhUlRnb3NSdHU1dXpKLzF1cHp4bThDeng0ZThJK2NVd3dTc2tIVjM3eS9pb0dWNDNobjQ1cmpaTzNCQnZDZGdoYXk3ZTFaUkJ5MWhET052QVM5VUw3QzNkK2dDK1UzQUNsdDNkNTlDajFveSszVGdHK0pDNzhBbEtITUNsZ0h2QUw2RmNRUEd3NlJEdTVDci9NdXI2d29aYUN6R2t3RXYxSE4wNzEya1JVL0FHZ2VjaXZGSWpwL1ozODUxNnBPR003NFQ5RUkxNHlwdUVST3dqcUhJaGIzVFpZQ2tZdE14MWdXOFVBL1RIV3ZlWnBGM0FsYXhEVTZqTGtzV2RZM1FXOExUZmJxYkpPOEVyS0xiMWNBWTcwNXBpcmNUOWlHeHFSTjA4azdBS3JyOWtUcXM2MVY3eHAwQkw4cG00QzNla1IzbG5ZQlZkTHNHRGJkS2RXemdDM0tKZCtCSTVKbUFWV3lEYjNoM1JyY2FnL0ZZd0l1eEZwanFIVG9pZVNaZ0ZkbGVCR1o1ZDBZM09qUHdMMVYzYldsV2pMd1RzSXBxMTN0M1JMZlppYkNiOHg2bEJ2dE9PSmxKOWdXbXl4eHE3ZXZkRWQwalpFUEl0UE9QOW80Y3NWRmszK0NtekhheGQwZDBpMzBKbS8rdzBEdHc1QTZMb0RnU2pEWFVkMDVPUkl3L0IzUjZIN0NmZCtTb0dUK1BvRGo2ei9Udjh1Nk9MTXJZQjZNb0h3UGVFL0Q4SzRCRkpXWHBGaUg5V1RiZHA1WERhTUkrVEw2QUZpWHJaSFRnY0xYc1Zvc3RvR005ZzN5VmRQUE1iQkxPQVo0dUxVMTNtRTVjci9kMDd3QjF0U1BHOHdGL2lSNUg5L2xrOGRZSXpob0QyMSs5T3lTTG1QNmlwTkk1ekJNeVB6L2hER0JEYVhtNngyYnZBSVBFbHFjVzNvVFJHL0JYNkMvb0JyaXNkbzNnckRHdy9kNjdRN0tJNnd4aW5FZjJyUWdTRXVZQ1NZbUp1c25UUUo5M2lBRWU5dzZRUlV3Rk1nYzROT0Q1VjBJOXhyR1I2QUVlOFE3eGtvUUh2Q1BVeVRZWUR3YWNudGNEdTNpSHJoM2o4Z2lHVm1uejJld25XQ3hua0pPQjF3VThmeDd3UkVsWnVsY1N6Y0o1cTRHL2U0ZW9pOGtZendiODlYbUtkR2thQ1RlV2ZNdVdGdFYrNHQwUjlXRmNFSGhxUHM0N2NxMFo1enNYUngvZHRjSmxxZmJDMkJUUXVZdlExN3A1N1lMdjdNS3J2VHVnUG95YkFzOGU3L2FPM0JWQ0Y5NHJycTBIN1RTVjFRY0RPL2UzM29HN3lHakM5bk1zcHFXck4wb0dvekR1QytqY0Y0RmR2VU4zbVQweFZsZFlJRmQ2SDNDZG5Cell1ZC8zRHR5bDlxZWFiN1grZ05ZSnlPeFZHS3NDT25jbE1ONDdkQmViamZGTWljVnhMVnA2TklCeFh1QzQ5ZlBla1J0Z0Y0dzdDaTZNWHRMTk8ydjlyV1BSNFEyWVNYcFZmQW93bHZScS9UclNtOVArUjdxejBUWVpmOTY5Sk94TFhEZlpkYXNSd0VtazB3MG01ZnhaZDVEd1plRGUvTEhxYnd6cHluMVhCdzZkc3B3OUR2WSt1QVlhRDV4R3VxTlV5T3UxQ2VOR3dtNDQ3V3JqU2JmbktyWW9YbTd6dlE5UTJBODRIZU02alB0SmJ3bmFoTEVlWXlYR1hhUnJJSDhhMk5FNWExU09vc2lkaUY3WmVvQTl2QTlTSk5TMkdCZVZXQmo5Ylo3M2dZcUUyaDdqbGdxSzQ3L0FSTytERllIczgwRzJ4YmlPYWo2QXJVTFRhS1ZXcWhsV0RXelhVL1B2ejZVNWpxcTRPTklHcDNnZnVFZ240eW4zMjZxaDJndG85VDF4MXVrenlGeGdweXFDdERBTzQ3dE92MXNFR0hxY1B3YmpTV0J5VldGYTJFVENyc0JUamhta3dZWTZneHlKYjNGQWVzL1c4YzRacE1IYUY0aHhWSVU1MmpPTzhZNGd6ZFZ1aUdWYkx0aDVuMEZTQ1RzREs3eGpTUE8wTzRQTUpKYmlTTlZpRlQ3cFB1MEtKR1NWd3lyRWxrY2FvbDJCVEtrMFJTZkdOTzhJMGt6dENpUzJIWnMwcDFsY3RDdVFua3BUZExiZU80QTBVN3NDV1ZOcGlrNlN5UEpJWTdRcmtHV1ZwdWhzdVhjQWFhYWhDbVJkbFVFNldPSWRRSnFwWFlIMEFuZFdHV1FJSzRHbDNpR2ttZHJmYXBKRXM2cElMRGxFdHJJRHZ2dEk5RStjT3NDN0kwUmFNMzdxWENBTHZidEFaQ2l2d1hOUE8zaXZkd2VJZEhLcVU0RmM0WDNnSWxtTW9KcjFzQWEyWmNBRTd3TVh5V295eGdNVkZjZXphQmRVcWFFWkdBOVZVQno2MWtwcTY5VVV2OUZLZjFzT3ZOSDdBRVh5R29WeEZzYkdnaitRYXoxZTZTcDdrVzZhMDVlak1CYWlyM0tseTgzQ09KdnNPeEt0d0xnUWZkYVFHaWg2Z2VoZGdIMkIxMkZNQWNZQkcwam5jeXduM2JQdWdZSi9wNGlJaUlpSWlJaUlpSWlJaUlpSVNISCtEeG9FQ0lUTGpRb0JBQUFBQUVsRlRrU3VRbUNDJztcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgS1BJIE1lc3NhZ2VcbiAgICAgICAgdGhpcy5rcGkubWVzc2FnZSA9IF8uZ2V0KHRoaXMuY29uZmlnLCAnY3VzdG9td2lkZ2V0ZGF0YS5rcGkubWVzc2FnZScpO1xuICAgICAgICBpZih0aGlzLmtwaS5tZXNzYWdlID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkubWVzc2FnZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmtwaS5tZXNzYWdlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IEtQSSBDb2xvclxuICAgICAgICB0aGlzLmtwaS5kZWZhdWx0LmNvbG9yID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS5jb2xvcicpO1xuICAgICAgICBpZih0aGlzLmtwaS5kZWZhdWx0LmNvbG9yID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkuZGVmYXVsdC5jb2xvci5pbmRleE9mKCcjJykgIT09IDApIHtcbiAgICAgICAgICB0aGlzLmtwaS5kZWZhdWx0LmNvbG9yID0gJyNiMGIwYjAnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua3BpLmNvbG9yID0gdGhpcy5rcGkuZGVmYXVsdC5jb2xvcjtcbiAgICAgICAgLy8gR2V0IEJnIEtQSSBDb2xvclxuICAgICAgICB0aGlzLmtwaS5kZWZhdWx0LmJnY29sb3IgPSBfLmdldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEua3BpLmJnY29sb3InKTtcbiAgICAgICAgaWYodGhpcy5rcGkuZGVmYXVsdC5iZ2NvbG9yID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkuZGVmYXVsdC5iZ2NvbG9yLmluZGV4T2YoJyMnKSAhPT0gMCkge1xuICAgICAgICAgIHRoaXMua3BpLmRlZmF1bHQuYmdjb2xvciA9ICcjRkZGRkZGJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtwaS5iZ2NvbG9yID0gdGhpcy5rcGkuZGVmYXVsdC5iZ2NvbG9yO1xuXG4gICAgICAgIC8vIEdldCBUaXRsZSBDb2xvclxuICAgICAgICB0aGlzLmtwaS50aXRsZUNvbG9yID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS50aXRsZUNvbG9yJyk7XG4gICAgICAgIGlmKHRoaXMua3BpLnRpdGxlQ29sb3IgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmtwaS50aXRsZUNvbG9yLmluZGV4T2YoJyMnKSAhPT0gMCkge1xuICAgICAgICAgIHRoaXMua3BpLnRpdGxlQ29sb3IgPSAnI2IwYjBiMCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgVW5pdCBDb2xvclxuICAgICAgICB0aGlzLmtwaS51bml0Q29sb3IgPSBfLmdldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEua3BpLnVuaXRDb2xvcicpO1xuICAgICAgICBpZih0aGlzLmtwaS51bml0Q29sb3IgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmtwaS51bml0Q29sb3IuaW5kZXhPZignIycpICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5rcGkudW5pdENvbG9yID0gJyNiMGIwYjAnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IG1lc3NhZ2UgQ29sb3JcbiAgICAgICAgdGhpcy5rcGkubWVzc2FnZUNvbG9yID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS5tZXNzYWdlQ29sb3InKTtcbiAgICAgICAgaWYodGhpcy5rcGkubWVzc2FnZUNvbG9yID09PSB1bmRlZmluZWQgfHwgdGhpcy5rcGkubWVzc2FnZUNvbG9yLmluZGV4T2YoJyMnKSAhPT0gMCkge1xuICAgICAgICAgIHRoaXMua3BpLm1lc3NhZ2VDb2xvciA9ICcjODA4MDgwJztcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgS1BJIFVuaXRcbiAgICAgICAgdGhpcy5rcGkudW5pdCA9IF8uZ2V0KHRoaXMuY29uZmlnLCAnY3VzdG9td2lkZ2V0ZGF0YS5rcGkudW5pdCcpO1xuICAgICAgICB0aGlzLmtwaS50aXRsZVNpemUgPSBfLmdldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEua3BpLnRpdGxlU2l6ZScpO1xuICAgICAgICB0aGlzLmtwaS5rcGlTaXplID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS5rcGlTaXplJyk7XG4gICAgICAgIHRoaXMua3BpLnVuaXRTaXplID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS51bml0U2l6ZScpO1xuICAgICAgICB0aGlzLmtwaS5tZXNzYWdlU2l6ZSA9IF8uZ2V0KHRoaXMuY29uZmlnLCAnY3VzdG9td2lkZ2V0ZGF0YS5rcGkubWVzc2FnZVNpemUnKTtcbiAgICAgICAgdGhpcy5rcGkuaW1hZ2VTaXplID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhLmtwaS5pbWFnZVNpemUnKTtcbiAgICAgICAgdGhpcy5rcGkudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmdldERldmljZURhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ3VyZVRvcE1hcmdpblJlcXVpcmVkKCk7XG4gIH1cblxuICAgIC8vIENvbmZpZ3VyZSB0b3AgbWFyZ2luIHdpdGhpbiB0aGUgd2lkZ2V0LiBUaGlzIGlzIG9uIHRoZSBiYXNpcyBpZiB0aGUgV2lkZ2V0IHRpdGxlIGlzIHNldCB0byBoaWRkZW4gb3Igbm90LlxuICAgIHByaXZhdGUgY29uZmlndXJlVG9wTWFyZ2luUmVxdWlyZWQoKTogdm9pZCB7XG4gICAgICBjb25zdCBhbGxXaWRnZXRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRhc2hib2FyZC1ncmlkLWNoaWxkJyk7XG4gICAgICAgIGFsbFdpZGdldHMuZm9yRWFjaCgodzpFbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd2lkZ2V0RWxlbWVudDogRWxlbWVudCA9IHcucXVlcnlTZWxlY3RvcignZGl2ID4gZGl2ID4gZGl2ID4gYzh5LWR5bmFtaWMtY29tcG9uZW50ID4gbGliLWdwLWtwaS1vdmVydmlldy13aWRnZXQnKTtcbiAgICAgICAgICBpZih3aWRnZXRFbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgd2lkZ2V0RWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0VGl0bGVFbGVtZW50OiBFbGVtZW50ID0gdy5xdWVyeVNlbGVjdG9yKCdkaXYgPiBkaXYgPiBkaXYgPiBjOHktZGFzaGJvYXJkLWNoaWxkLXRpdGxlJyk7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRUaXRsZURpc3BsYXlWYWx1ZTogc3RyaW5nID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUod2lkZ2V0VGl0bGVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5Jyk7XG4gICAgICAgICAgICBpZih3aWRnZXRUaXRsZURpc3BsYXlWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHdpZGdldFRpdGxlRGlzcGxheVZhbHVlICE9PSBudWxsICYmIHdpZGdldFRpdGxlRGlzcGxheVZhbHVlID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgdGhpcy5rcGkudG9wTWFyZ2luID0gJzI1cHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5rcGkudG9wTWFyZ2luID0gJzAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICBhc3luYyBnZXREZXZpY2VEYXRhKCkge1xuICAgIGlmICh0aGlzLmtwaS5rcGlOYW1lICE9PSBudWxsICYmIHRoaXMua3BpLmtwaU5hbWUgIT09ICcnKSB7XG5cbiAgICAgICAgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICd0b3RhbERldmljZXMnKXtcbiAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMua3BpU2VydmljZS5nZXREZXZpY2VzQXZhaWxhYmlsaXR5KHRoaXMuZGV2aWNlLmlkKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmtwaS52YWx1ZSA9IHJlc3VsdC50b3RhbERldmljZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldERldmljZXNBdmFpbGFiaWxpdHkodGhpcy5kZXZpY2UuaWQpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMua3BpLnZhbHVlID0gcmVzdWx0LmF2YWlsYWJsZURldmljZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICd1bmF2YWlsYWJsZScpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmtwaVNlcnZpY2UuZ2V0RGV2aWNlc0F2YWlsYWJpbGl0eSh0aGlzLmRldmljZS5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5rcGkudmFsdWUgPSByZXN1bHQudW5hdmFpbGFibGVEZXZpY2VzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmtwaS5rcGlOYW1lID09PSAndG90YWxBbGFybXMnKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldEFsYXJtcyh0aGlzLmRldmljZS5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5rcGkudmFsdWUgPSByZXN1bHQudG90YWxBbGFybXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICdtYWpvcicpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmtwaVNlcnZpY2UuZ2V0QWxhcm1zKHRoaXMuZGV2aWNlLmlkKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmtwaS52YWx1ZSA9IHJlc3VsdC5tYWpvckFsZXJ0c0NvdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmtwaS5rcGlOYW1lID09PSAnbWlub3InKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldEFsYXJtcyh0aGlzLmRldmljZS5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5rcGkudmFsdWUgPSByZXN1bHQubWlub3JBbGVydHNDb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5rcGkua3BpTmFtZSA9PT0gJ2NyaXRpY2FsJykge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMua3BpU2VydmljZS5nZXRBbGFybXModGhpcy5kZXZpY2UuaWQpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMua3BpLnZhbHVlID0gcmVzdWx0LmNyaXRpY2FsQWxlcnRzQ291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICdoaWdoUmlzaycpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmtwaVNlcnZpY2UuZ2V0RmlybXdhcmVSaXNrcyh0aGlzLmRldmljZS5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5rcGkudmFsdWUgPSByZXN1bHQuaGlnaFJpc2tDb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5rcGkua3BpTmFtZSA9PT0gJ21lZGl1bVJpc2snKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldEZpcm13YXJlUmlza3ModGhpcy5kZXZpY2UuaWQpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMua3BpLnZhbHVlID0gcmVzdWx0Lm1lZGl1bVJpc2tDb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5rcGkua3BpTmFtZSA9PT0gJ2xvd1Jpc2snKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldEZpcm13YXJlUmlza3ModGhpcy5kZXZpY2UuaWQpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMua3BpLnZhbHVlID0gcmVzdWx0Lmxvd1Jpc2tDb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5rcGkua3BpTmFtZSA9PT0gJ25vUmlzaycpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmtwaVNlcnZpY2UuZ2V0RmlybXdhcmVSaXNrcyh0aGlzLmRldmljZS5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5rcGkudmFsdWUgPSByZXN1bHQubm9SaXNrQ291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua3BpLmtwaU5hbWUgPT09ICdvdGhlcicpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmtwaS5vdGhlcktQSU1ldHJpYyA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldE5ld0tQSVZhbHVlKHRoaXMuZGV2aWNlLmlkLCB0aGlzLmtwaS5vdGhlcktQSU5hbWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICB0aGlzLmtwaS52YWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZih0aGlzLmtwaS5vdGhlcktQSU1ldHJpYyA9PT0gJ2NvdW50Jykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5rcGlTZXJ2aWNlLmdldE5ld0tQSUNvdW50KHRoaXMuZGV2aWNlLmlkLCB0aGlzLmtwaS5vdGhlcktQSU5hbWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICB0aGlzLmtwaS52YWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICB0aGlzLmtwaS52YWx1ZSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgICAgIC8vIEdldHRlciBLUEkgVGl0bGVcbiAgcHVibGljIGdldEtQSVRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMua3BpLnRpdGxlO1xuICB9XG4gIC8vIEdldHRlciBLUEkgVGl0bGUgVG9wIE1hcmdpblxuICBwdWJsaWMgZ2V0S1BJVGl0bGVUb3BNYXJnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMua3BpLnRvcE1hcmdpbjtcbiAgfVxuICAvLyBHZXR0ZXIgS1BJIEljb25cbiAgcHVibGljIGdldEtQSUljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5rcGkuaWNvbjtcbiAgfVxuICAvLyBHZXQgS1BJIENvbnRhaW5lciBIZWlnaHRcbiAgcHVibGljIGdldEtQSUNvbnRhaW5lckhlaWdodCgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuICc5MHB4JztcbiAgfVxuICAvLyBHZXR0ZXIgS1BJIFZhbHVlXG4gIHB1YmxpYyBnZXRLUElWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkudmFsdWU7XG4gIH1cbiAgLy8gR2V0dGVyIEtQSSBVbml0XG4gIHB1YmxpYyBnZXRLUElVbml0KCkge1xuICAgIHJldHVybiB0aGlzLmtwaS51bml0O1xuICB9XG4gIC8vIEdldHRlciBLUEkgTmFtZVxuICBwdWJsaWMgZ2V0S1BJTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkua3BpTmFtZTtcbiAgfVxuICAvLyBHZXR0ZXIgS1BJIENvbG9yXG4gIHB1YmxpYyBnZXRLUElDb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkuY29sb3I7XG4gIH1cbiAgLy8gR2V0dGVyIFRpdGxlIENvbG9yXG4gIHB1YmxpYyBnZXRUaXRsZUNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS50aXRsZUNvbG9yO1xuICB9XG4gIC8vIEdldHRlciBVbml0IENvbG9yXG4gIHB1YmxpYyBnZXRVbml0Q29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMua3BpLnVuaXRDb2xvcjtcbiAgfVxuICAvLyBHZXR0ZXIgTWVzc2FnZSBDb2xvclxuICBwdWJsaWMgZ2V0TWVzc2FnZUNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS5tZXNzYWdlQ29sb3I7XG4gIH1cbiAgLy8gR2V0dGVyIEtQSSBiYWNrZ3JvdW5kIENvbG9yXG4gIHB1YmxpYyBnZXRLUElCZ0NvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS5iZ2NvbG9yO1xuICB9XG4gIC8vIEdldHRlciBPdGhlciBLUEkgTmFtZVxuICBwdWJsaWMgZ2V0T3RoZXJLUElOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS5vdGhlcktQSU5hbWU7XG4gIH1cbiAgLy8gR2V0dGVyIE90aGVyIEtQSSBtZXRyaWNcbiAgcHVibGljIGdldE90aGVyS1BJTWV0cmljKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS5vdGhlcktQSU1ldHJpYztcbiAgfVxuICAgIC8vIEdldHRlciBPdGhlciBLUEkgTWVzc2FnZVxuICBwdWJsaWMgZ2V0S1BJTWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkubWVzc2FnZTtcbiAgfVxuICBwdWJsaWMgZ2V0S1BJU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkua3BpU2l6ZSArICdweCc7XG4gIH1cbiAgcHVibGljIGdldFRpdGxlU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rcGkudGl0bGVTaXplICsgJ3B4JztcbiAgfVxuICBwdWJsaWMgZ2V0TWVzc2FnZVNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMua3BpLm1lc3NhZ2VTaXplICsgJ3B4JztcbiAgfVxuICBwdWJsaWMgZ2V0VW5pdFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMua3BpLnVuaXRTaXplICsgJ3B4JztcbiAgfVxuICBwdWJsaWMgZ2V0SW1hZ2VTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmtwaS5pbWFnZVNpemUgKyAncHgnO1xuICB9XG5cbiAgcHVibGljIGdldENvbnRhaW5lckhlaWdodCgpe1xuICAgICAgaWYgKHRoaXMua3BpLmltYWdlU2l6ZSA+IHRoaXMua3BpLnRpdGxlU2l6ZSAmJiB0aGlzLmtwaS5pbWFnZVNpemUgPiB0aGlzLmtwaS5rcGlTaXplKSB7XG4gICAgICAgIHRoaXMua3BpLmNvbnRhaW5lckhlaWdodCA9IHRoaXMua3BpLmltYWdlU2l6ZSArIDEwO1xuICAgICB9IGVsc2UgaWYodGhpcy5rcGkudGl0bGVTaXplID4gdGhpcy5rcGkua3BpU2l6ZSl7XG4gICAgICAgIHRoaXMua3BpLmNvbnRhaW5lckhlaWdodCA9IHRoaXMua3BpLnRpdGxlU2l6ZSArIDEwO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5rcGkuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5rcGkua3BpU2l6ZSArIDEwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5rcGkuY29udGFpbmVySGVpZ2h0ICsgJ3B4JztcbiAgfVxufVxuIl19