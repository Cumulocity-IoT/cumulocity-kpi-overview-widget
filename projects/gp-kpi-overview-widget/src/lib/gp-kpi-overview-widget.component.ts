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
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { GpKpiOverviewWidgetService } from './gp-kpi-overview-widget.service';


interface Device {
  id: string;
}

interface KPI {
  default: {
    color: string;
    bgcolor: string
  }
  title: string;
  icon: string;
  topMargin: string;
  color: string;
  bgcolor: string;
  unitColor: string;
  titleColor: string;
  messageColor: string;
  value: any;
  unit: string;
  message: string;
  kpiName: string;
  otherKPIName: string;
  otherKPIMetric: string;
  titleSize: number;
  messageSize: number;
  kpiSize: number;
  unitSize: number;
  imageSize: number;
  containerHeight: number;
}

@Component({
  selector: 'lib-gp-kpi-overview-widget',
  templateUrl: './gp-kpi-overview-widget.html',
  styles: []
})
export class GpKpiOverviewWidgetComponent implements OnInit, AfterViewInit{

  @Input() config;

  private device: Device = {
    id: ''
  }

  private kpi: KPI = {
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
  }

  constructor(private kpiService: GpKpiOverviewWidgetService) { }

  ngOnInit() {

        // Get Device Id
        this.device.id = _.get(this.config, 'device.id');
        if(this.device.id === undefined || this.device.id.length === 0) {
        }
        // Get KPI Title
        this.kpi.title = _.get(this.config, 'customwidgetdata.metadata.title');
        if(this.kpi.title === undefined || this.kpi.title.length === 0) {
          this.kpi.title = 'Default Title';
        }
        // Get KPI Name
        this.kpi.kpiName = _.get(this.config, 'customwidgetdata.kpi.kpiName');
        if(this.kpi.kpiName === undefined || this.kpi.kpiName.length === 0) {
          this.kpi.kpiName = 'totalDevices';
        }
        // Get KPI Icon
        this.kpi.icon = _.get(this.config, 'customwidgetdata.metadata.icon');
        if(this.kpi.icon === undefined || this.kpi.icon.length === 0) {
          this.kpi.icon = 'data:image/png;base64,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';
        }
        // Get KPI Message
        this.kpi.message = _.get(this.config, 'customwidgetdata.kpi.message');
        if(this.kpi.message === undefined || this.kpi.message.length === 0) {
          this.kpi.message = '';
        }
        // Get KPI Color
        this.kpi.default.color = _.get(this.config, 'customwidgetdata.kpi.color');
        if(this.kpi.default.color === undefined || this.kpi.default.color.indexOf('#') !== 0) {
          this.kpi.default.color = '#b0b0b0';
        }
        this.kpi.color = this.kpi.default.color;
        // Get Bg KPI Color
        this.kpi.default.bgcolor = _.get(this.config, 'customwidgetdata.kpi.bgcolor');
        if(this.kpi.default.bgcolor === undefined || this.kpi.default.bgcolor.indexOf('#') !== 0) {
          this.kpi.default.bgcolor = '#FFFFFF';
        }
        this.kpi.bgcolor = this.kpi.default.bgcolor;

        // Get Title Color
        this.kpi.titleColor = _.get(this.config, 'customwidgetdata.kpi.titleColor');
        if(this.kpi.titleColor === undefined || this.kpi.titleColor.indexOf('#') !== 0) {
          this.kpi.titleColor = '#b0b0b0';
        }

        // Get Unit Color
        this.kpi.unitColor = _.get(this.config, 'customwidgetdata.kpi.unitColor');
        if(this.kpi.unitColor === undefined || this.kpi.unitColor.indexOf('#') !== 0) {
          this.kpi.unitColor = '#b0b0b0';
        }

        // Get message Color
        this.kpi.messageColor = _.get(this.config, 'customwidgetdata.kpi.messageColor');
        if(this.kpi.messageColor === undefined || this.kpi.messageColor.indexOf('#') !== 0) {
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
    private configureTopMarginRequired(): void {
      const allWidgets: NodeListOf<Element> = document.querySelectorAll('.dashboard-grid-child');
        allWidgets.forEach((w:Element) => {
          const widgetElement: Element = w.querySelector('div > div > div > c8y-dynamic-component > lib-gp-kpi-overview-widget');
          if(widgetElement !== undefined && widgetElement !== null) {
            const widgetTitleElement: Element = w.querySelector('div > div > div > c8y-dashboard-child-title');
            const widgetTitleDisplayValue: string = window.getComputedStyle(widgetTitleElement).getPropertyValue('display');
            if(widgetTitleDisplayValue !== undefined && widgetTitleDisplayValue !== null && widgetTitleDisplayValue === 'none') {
              this.kpi.topMargin = '25px';
            } else {
              this.kpi.topMargin = '0';
            }
          }
        });
    }
    // get Device details
  async getDeviceData() {
    if (this.kpi.kpiName !== null && this.kpi.kpiName !== '') {

        if (this.kpi.kpiName === 'totalDevices'){
         const result = await this.kpiService.getDevicesAvailability(this.device.id);
          if (result) {
            this.kpi.value = result.totalDevices;
          }
        }
        else if (this.kpi.kpiName === 'available') {
          const result = await this.kpiService.getDevicesAvailability(this.device.id);
          if (result) {
            this.kpi.value = result.availableDevices;
          }
        }
        else if (this.kpi.kpiName === 'unavailable') {
          const result = await this.kpiService.getDevicesAvailability(this.device.id);
          if (result) {
            this.kpi.value = result.unavailableDevices;
          }
        }
        else if (this.kpi.kpiName === 'totalAlarms') {
          const result = await this.kpiService.getAlarms(this.device.id);
          if (result) {
            this.kpi.value = result.totalAlarms;
          }
        }
        else if (this.kpi.kpiName === 'major') {
          const result = await this.kpiService.getAlarms(this.device.id);
          if (result) {
            this.kpi.value = result.majorAlertsCount;
          }
        }
        else if (this.kpi.kpiName === 'minor') {
          const result = await this.kpiService.getAlarms(this.device.id);
          if (result) {
            this.kpi.value = result.minorAlertsCount;
          }
        }
        else if (this.kpi.kpiName === 'critical') {
          const result = await this.kpiService.getAlarms(this.device.id);
          if (result) {
            this.kpi.value = result.criticalAlertsCount;
          }
        }
        else if (this.kpi.kpiName === 'highRisk') {
          const result = await this.kpiService.getFirmwareRisks(this.device.id);
          if (result) {
            this.kpi.value = result.highRiskCount;
          }
        }
        else if (this.kpi.kpiName === 'mediumRisk') {
          const result = await this.kpiService.getFirmwareRisks(this.device.id);
          if (result) {
            this.kpi.value = result.mediumRiskCount;
          }
        }
        else if (this.kpi.kpiName === 'lowRisk') {
          const result = await this.kpiService.getFirmwareRisks(this.device.id);
          if (result) {
            this.kpi.value = result.lowRiskCount;
          }
        }
        else if (this.kpi.kpiName === 'noRisk') {
          const result = await this.kpiService.getFirmwareRisks(this.device.id);
          if (result) {
            this.kpi.value = result.noRiskCount;
          }
        }
        else if (this.kpi.kpiName === 'other') {

          if (this.kpi.otherKPIMetric === 'value') {
            const result = await this.kpiService.getNewKPIValue(this.device.id, this.kpi.otherKPIName);
            if (result) {
              this.kpi.value = result;
            }
          }
          else if(this.kpi.otherKPIMetric === 'count') {
            const result = await this.kpiService.getNewKPICount(this.device.id, this.kpi.otherKPIName);
            if (result) {
              this.kpi.value = result;
            }
          }
        }
        else{
          this.kpi.value = 0;
        }
    }
  }
      // Getter KPI Title
  public getKPITitle(): string {
    return this.kpi.title;
  }
  // Getter KPI Title Top Margin
  public getKPITitleTopMargin() {
    return this.kpi.topMargin;
  }
  // Getter KPI Icon
  public getKPIIcon(): string {
    return this.kpi.icon;
  }
  // Get KPI Container Height
  public getKPIContainerHeight(): string {
      return '90px';
  }
  // Getter KPI Value
  public getKPIValue() {
    return this.kpi.value;
  }
  // Getter KPI Unit
  public getKPIUnit() {
    return this.kpi.unit;
  }
  // Getter KPI Name
  public getKPIName() {
    return this.kpi.kpiName;
  }
  // Getter KPI Color
  public getKPIColor() {
    return this.kpi.color;
  }
  // Getter Title Color
  public getTitleColor() {
    return this.kpi.titleColor;
  }
  // Getter Unit Color
  public getUnitColor() {
    return this.kpi.unitColor;
  }
  // Getter Message Color
  public getMessageColor() {
    return this.kpi.messageColor;
  }
  // Getter KPI background Color
  public getKPIBgColor() {
    return this.kpi.bgcolor;
  }
  // Getter Other KPI Name
  public getOtherKPIName() {
    return this.kpi.otherKPIName;
  }
  // Getter Other KPI metric
  public getOtherKPIMetric() {
    return this.kpi.otherKPIMetric;
  }
    // Getter Other KPI Message
  public getKPIMessage() {
    return this.kpi.message;
  }
  public getKPISize() {
    return this.kpi.kpiSize + 'px';
  }
  public getTitleSize() {
    return this.kpi.titleSize + 'px';
  }
  public getMessageSize() {
    return this.kpi.messageSize + 'px';
  }
  public getUnitSize() {
    return this.kpi.unitSize + 'px';
  }
  public getImageSize() {
    return this.kpi.imageSize + 'px';
  }

  public getContainerHeight(){
      if (this.kpi.imageSize > this.kpi.titleSize && this.kpi.imageSize > this.kpi.kpiSize) {
        this.kpi.containerHeight = this.kpi.imageSize + 10;
     } else if(this.kpi.titleSize > this.kpi.kpiSize){
        this.kpi.containerHeight = this.kpi.titleSize + 10;
    }else{
      this.kpi.containerHeight = this.kpi.kpiSize + 10;
    }
    return this.kpi.containerHeight + 'px';
  }
}
