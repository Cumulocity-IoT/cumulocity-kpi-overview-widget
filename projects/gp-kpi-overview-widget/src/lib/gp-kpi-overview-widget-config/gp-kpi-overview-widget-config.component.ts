

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

import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'lib-gp-kpi-overview-widget-config',
  templateUrl: './gp-kpi-overview-widget-config.html',
  styleUrls: ['./gp-kpi-overview-widget-config.css']
})
export class GpKpiOverviewWidgetConfigComponent implements OnInit {
  @Input() config: any = {};
  kpiColorPickerClosed = true;
  kpiBgColorPickerClosed = true;
  titleColorPickerClosed = true;
  kpiUnitColorPickerClosed = true;
  messageColorPickerClosed = true;



  widgetInfo = {
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
}
kpiNamesList = [
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
    }
    ,
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
  constructor() {}

  async ngOnInit() {
    // Editing an existing widget
    if(_.has(this.config, 'customwidgetdata')) {
      this.widgetInfo = _.get(this.config, 'customwidgetdata');
    } else { // Adding a new widget
      _.set(this.config, 'customwidgetdata', this.widgetInfo);
    }
  }

  public updateIconInConfig($event: Event) {
    const kpiIcon = ($event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(kpiIcon);
    reader.onload = () => {
        this.widgetInfo.metadata.icon = reader.result as string;
        _.set(this.config, 'customwidgetdata', this.widgetInfo);
    };
  }

  public updateConfig() {

    _.set(this.config, 'customwidgetdata', this.widgetInfo);
  }


  setSelectedColorForKPI(value: string) {
    this.widgetInfo.kpi.color = value;
    this.updateConfig();
  }

  closeKPIColorPicker() {
    this.kpiColorPickerClosed = true;
  }

  openKPIColorPicker() {
    this.kpiColorPickerClosed = false;
  }

  setSelectedColorForTitle(value: string) {
    this.widgetInfo.kpi.titleColor = value;
    this.updateConfig();
  }

  closeTitleColorPicker() {
    this.titleColorPickerClosed = true;
  }

  openTitleColorPicker() {
    this.titleColorPickerClosed = false;
  }

  setSelectedColorForKPIUnit(value: string) {
    this.widgetInfo.kpi.unitColor = value;
    this.updateConfig();
  }

  closeKPIUnitColorPicker() {
    this.kpiUnitColorPickerClosed = true;
  }

  openKPIUnitColorPicker() {
    this.kpiUnitColorPickerClosed = false;
  }

  setSelectedColorForMessage(value: string) {
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

  setSelectedColorForBackground(value: string) {
    this.widgetInfo.kpi.bgcolor = value;
    this.updateConfig();
  }

}