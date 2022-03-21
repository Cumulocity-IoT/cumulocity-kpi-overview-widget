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
import { __awaiter } from "tslib";
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
export class GpKpiOverviewWidgetConfigComponent {
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
            if (_.has(this.config, 'customwidgetdata')) {
                this.widgetInfo = _.get(this.config, 'customwidgetdata');
            }
            else { // Adding a new widget
                _.set(this.config, 'customwidgetdata', this.widgetInfo);
            }
        });
    }
    updateIconInConfig($event) {
        const kpiIcon = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(kpiIcon);
        reader.onload = () => {
            this.widgetInfo.metadata.icon = reader.result;
            _.set(this.config, 'customwidgetdata', this.widgetInfo);
        };
    }
    updateConfig() {
        _.set(this.config, 'customwidgetdata', this.widgetInfo);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC9zcmMvbGliL2dwLWtwaS1vdmVydmlldy13aWRnZXQtY29uZmlnL2dwLWtwaS1vdmVydmlldy13aWRnZXQtY29uZmlnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQU81QixNQUFNLE9BQU8sa0NBQWtDO0lBc0Y3QztRQXJGUyxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQzFCLHlCQUFvQixHQUFHLElBQUksQ0FBQztRQUM1QiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLDZCQUF3QixHQUFHLElBQUksQ0FBQztRQUNoQyw2QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFJaEMsZUFBVSxHQUFHO1lBQ1gsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFO2FBQ1Q7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxhQUFhLEVBQUUsRUFBRTtnQkFDakIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFdBQVcs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QyxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7O1lBdExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxvMlFBQW1EOzthQUVwRDs7OztxQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKlxyXG4qIENvcHlyaWdodCAoYykgMjAyMCBTb2Z0d2FyZSBBRywgRGFybXN0YWR0LCBHZXJtYW55IGFuZC9vciBpdHMgbGljZW5zb3JzXHJcbipcclxuKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG4qXHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbipcclxuKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuKlxyXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1ncC1rcGktb3ZlcnZpZXctd2lkZ2V0LWNvbmZpZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dwLWtwaS1vdmVydmlldy13aWRnZXQtY29uZmlnLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dwLWtwaS1vdmVydmlldy13aWRnZXQtY29uZmlnLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcEtwaU92ZXJ2aWV3V2lkZ2V0Q29uZmlnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBjb25maWc6IGFueSA9IHt9O1xyXG4gIGtwaUNvbG9yUGlja2VyQ2xvc2VkID0gdHJ1ZTtcclxuICBrcGlCZ0NvbG9yUGlja2VyQ2xvc2VkID0gdHJ1ZTtcclxuICB0aXRsZUNvbG9yUGlja2VyQ2xvc2VkID0gdHJ1ZTtcclxuICBrcGlVbml0Q29sb3JQaWNrZXJDbG9zZWQgPSB0cnVlO1xyXG4gIG1lc3NhZ2VDb2xvclBpY2tlckNsb3NlZCA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgd2lkZ2V0SW5mbyA9IHtcclxuICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgaWNvbjogJycsXHJcbiAgICB9LFxyXG4gICAga3BpOiB7XHJcbiAgICAgIGNvbG9yOiAnI2IwYjBiMCcsXHJcbiAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICBiZ2NvbG9yOiAnI0ZGRkZGRicsXHJcbiAgICAgIGtwaU5hbWU6ICcnLFxyXG4gICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgb3RoZXJLUElWYWx1ZTogJycsXHJcbiAgICAgIG90aGVyS1BJTmFtZTogJycsXHJcbiAgICAgIHRpdGxlQ29sb3I6ICcjODA4MDgwJyxcclxuICAgICAgdW5pdENvbG9yOiAnI2IwYjBiMCcsXHJcbiAgICAgIG1lc3NhZ2VDb2xvcjogJyM4MDgwODAnLFxyXG4gICAgICB0aXRsZVNpemU6IDIwLFxyXG4gICAgICBtZXNzYWdlU2l6ZTogMTAsXHJcbiAgICAgIHVuaXRTaXplOiAyMCxcclxuICAgICAga3BpU2l6ZTogMzAsXHJcbiAgICAgIGltYWdlU2l6ZTogNjAsXHJcblxyXG4gIH1cclxufVxyXG5rcGlOYW1lc0xpc3QgPSBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAndG90YWxEZXZpY2VzJyxcclxuICAgICAgdGV4dDogJ1RvdGFsIERldmljZXMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ2F2YWlsYWJsZScsXHJcbiAgICAgIHRleHQ6ICdBdmFpbGFibGUgRGV2aWNlcydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAndW5hdmFpbGFibGUnLFxyXG4gICAgICB0ZXh0OiAnVW5hdmFpbGFibGUgRGV2aWNlcydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAndG90YWxBbGFybXMnLFxyXG4gICAgICB0ZXh0OiAnVG90YWwgQWxhcm1zJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdtYWpvcicsXHJcbiAgICAgIHRleHQ6ICdNYWpvciBBbGFybXMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ21pbm9yJyxcclxuICAgICAgdGV4dDogJ01pbm9yIEFsYXJtcydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnY3JpdGljYWwnLFxyXG4gICAgICB0ZXh0OiAnQ3JpdGljYWwgQWxhcm1zJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdoaWdoUmlzaycsXHJcbiAgICAgIHRleHQ6ICdIaWdoIFJpc2snXHJcbiAgICB9XHJcbiAgICAsXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnbWVkaXVtUmlzaycsXHJcbiAgICAgIHRleHQ6ICdNZWRpdW0gUmlzaydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnbG93UmlzaycsXHJcbiAgICAgIHRleHQ6ICdMb3cgUmlzaydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnbm9SaXNrJyxcclxuICAgICAgdGV4dDogJ05vIFJpc2snXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ290aGVyJyxcclxuICAgICAgdGV4dDogJ090aGVyIFByb3BlcnR5J1xyXG4gICAgfVxyXG5cclxuICBdO1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBFZGl0aW5nIGFuIGV4aXN0aW5nIHdpZGdldFxyXG4gICAgaWYoXy5oYXModGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhJykpIHtcclxuICAgICAgdGhpcy53aWRnZXRJbmZvID0gXy5nZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhJyk7XHJcbiAgICB9IGVsc2UgeyAvLyBBZGRpbmcgYSBuZXcgd2lkZ2V0XHJcbiAgICAgIF8uc2V0KHRoaXMuY29uZmlnLCAnY3VzdG9td2lkZ2V0ZGF0YScsIHRoaXMud2lkZ2V0SW5mbyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlSWNvbkluQ29uZmlnKCRldmVudDogRXZlbnQpIHtcclxuICAgIGNvbnN0IGtwaUljb24gPSAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5maWxlc1swXTtcclxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChrcGlJY29uKTtcclxuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy53aWRnZXRJbmZvLm1ldGFkYXRhLmljb24gPSByZWFkZXIucmVzdWx0IGFzIHN0cmluZztcclxuICAgICAgICBfLnNldCh0aGlzLmNvbmZpZywgJ2N1c3RvbXdpZGdldGRhdGEnLCB0aGlzLndpZGdldEluZm8pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVDb25maWcoKSB7XHJcblxyXG4gICAgXy5zZXQodGhpcy5jb25maWcsICdjdXN0b213aWRnZXRkYXRhJywgdGhpcy53aWRnZXRJbmZvKTtcclxuICB9XHJcblxyXG5cclxuICBzZXRTZWxlY3RlZENvbG9yRm9yS1BJKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMud2lkZ2V0SW5mby5rcGkuY29sb3IgPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlQ29uZmlnKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZUtQSUNvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy5rcGlDb2xvclBpY2tlckNsb3NlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBvcGVuS1BJQ29sb3JQaWNrZXIoKSB7XHJcbiAgICB0aGlzLmtwaUNvbG9yUGlja2VyQ2xvc2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZENvbG9yRm9yVGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy53aWRnZXRJbmZvLmtwaS50aXRsZUNvbG9yID0gdmFsdWU7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbmZpZygpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VUaXRsZUNvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy50aXRsZUNvbG9yUGlja2VyQ2xvc2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9wZW5UaXRsZUNvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy50aXRsZUNvbG9yUGlja2VyQ2xvc2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZENvbG9yRm9yS1BJVW5pdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLndpZGdldEluZm8ua3BpLnVuaXRDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy51cGRhdGVDb25maWcoKTtcclxuICB9XHJcblxyXG4gIGNsb3NlS1BJVW5pdENvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy5rcGlVbml0Q29sb3JQaWNrZXJDbG9zZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgb3BlbktQSVVuaXRDb2xvclBpY2tlcigpIHtcclxuICAgIHRoaXMua3BpVW5pdENvbG9yUGlja2VyQ2xvc2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZENvbG9yRm9yTWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLndpZGdldEluZm8ua3BpLm1lc3NhZ2VDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy51cGRhdGVDb25maWcoKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTWVzc2FnZUNvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy5tZXNzYWdlQ29sb3JQaWNrZXJDbG9zZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1lc3NhZ2VDb2xvclBpY2tlcigpIHtcclxuICAgIHRoaXMubWVzc2FnZUNvbG9yUGlja2VyQ2xvc2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2VLUElCZ0NvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy5rcGlCZ0NvbG9yUGlja2VyQ2xvc2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9wZW5LUElCZ0NvbG9yUGlja2VyKCkge1xyXG4gICAgdGhpcy5rcGlCZ0NvbG9yUGlja2VyQ2xvc2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZENvbG9yRm9yQmFja2dyb3VuZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLndpZGdldEluZm8ua3BpLmJnY29sb3IgPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlQ29uZmlnKCk7XHJcbiAgfVxyXG5cclxufSJdfQ==