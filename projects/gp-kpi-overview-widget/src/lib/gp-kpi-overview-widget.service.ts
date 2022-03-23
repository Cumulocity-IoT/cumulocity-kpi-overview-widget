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
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { InventoryService } from '@c8y/client';


@Injectable()
export class GpKpiOverviewWidgetService {
  latestFirmwareVersion: any;


  constructor(public inventory: InventoryService) {
  }

  // To get Devices availability
  async getDevicesAvailability(deviceId){
    let totalDevices = 0;
    let availableDevices = 0;
    let unavailableDevices = 0;
      let response: any = null;
      const inventory = await this.inventory.detail(deviceId);
      response = inventory.data;
      if (response.hasOwnProperty('c8y_IsDevice')) {
        totalDevices = 1;

        if (response.childDevices.references.length > 0) {

          let available = false;
          const promises = response.childDevices.references.map(async (childDevice) => {
            const childInventory = await this.inventory.detail(childDevice.managedObject.id);
            const childDeviceData = childInventory.data;

            if (childDeviceData.hasOwnProperty('c8y_Availability')){

              if (childDeviceData.c8y_Availability.status === 'AVAILABLE') {
                available = true;
              } else {
                  available = false;
              }
            }
          });
          if(available){
            if (response.hasOwnProperty('c8y_Availability')) {
              if (response.c8y_Availability.status === 'AVAILABLE') {
                availableDevices = 1;
              }
              else{
                unavailableDevices = 1;
              }
            }else{
              availableDevices = 1;
            }
          }
          else{
            unavailableDevices = 1;
          }
          await Promise.all(promises);
        } else {
          if (response.hasOwnProperty('c8y_Availability') && (response.c8y_Availability.status === 'AVAILABLE')) {
            availableDevices = 1;
          }
          else{
            unavailableDevices = 1;
          }
        }
      }
        else {
          if (response.childAssets.references.length > 0) {
            const promises = response.childAssets.references.map(async (childDevice) => {
              const ChildInventory = await this.inventory.detail(childDevice.managedObject.id);
              const childDeviceData = ChildInventory.data;
              if (childDeviceData.hasOwnProperty('c8y_Availability')) {
                if (childDeviceData.c8y_Availability.status === 'AVAILABLE') {
                  availableDevices += 1;
                }
                else{
                  unavailableDevices += 1;
                }
              }
              else if(childDeviceData.hasOwnProperty('c8y_IsAsset')){
                let available = false;
                if (childDeviceData.childAssets.references.length > 0) {
                  const promises1 = childDeviceData.childAssets.references.map(async (assetChildDevice) => {
                    const assetChildInventory = await this.inventory.detail(assetChildDevice.managedObject.id);
                    const assetChildDeviceData = assetChildInventory.data;
                    if (assetChildDeviceData.hasOwnProperty('c8y_Availability')){

                      if (assetChildDeviceData.c8y_Availability.status === 'AVAILABLE') {
                        available = true;
                    } else {
                        available = false;
                    }
                    }
                    else{
                      available = false;
                    }
                  });
                  await Promise.all(promises1);
                }
                if (available) {
                  availableDevices += 1;
                }else{
                  unavailableDevices += 1;
                }
              }
            });
            await Promise.all(promises);
          }
          totalDevices = inventory.data.childAssets.references.length;
        }
        return {totalDevices, availableDevices, unavailableDevices};
    }
// To get Firmware Risks
  async getFirmwareRisks(deviceId){
    let highRiskCount = 0;
    let mediumRiskCount = 0;
    let lowRiskCount = 0;
    let noRiskCount = 0;
    const firmwareData = await this.inventory.list({ type: 'sag_racm_currentFirmware' });
    if (firmwareData.data.length > 0) {
    this.latestFirmwareVersion = firmwareData.data[0].firmware.version;
    }
    let response: any = null;
    const inventory = await this.inventory.detail(deviceId);
    response = inventory.data;
    if (response.hasOwnProperty('c8y_IsDevice')) {
      const risks = this.calculateRiskCount(response);
      highRiskCount = risks.highRisk;
      mediumRiskCount = risks.mediumRisk;
      lowRiskCount = risks.lowRisk;
      noRiskCount = risks.noRisk;
    }
    else if(response.childAssets.references.length > 0){

      const promises = response.childAssets.references.map(async (childDevice) => {
        const childInventory = await this.inventory.detail(childDevice.managedObject.id);
        const childDeviceData = childInventory.data;
        if (childDeviceData.hasOwnProperty('c8y_IsDevice')) {
          const risks = this.calculateRiskCount(response);
          highRiskCount = risks.highRisk;
          mediumRiskCount = risks.mediumRisk;
          lowRiskCount = risks.lowRisk;
          noRiskCount = risks.noRisk;        }
        else if(childDeviceData.hasOwnProperty('c8y_IsAsset')){
          if (childDeviceData.childAssets.references.length > 0) {
            const promises1 = childDeviceData.childAssets.references.map(async (assetChildDevice) => {
            const assetChildInventory = await this.inventory.detail(assetChildDevice.managedObject.id);
            const assetChildDeviceData = assetChildInventory.data;
            if (assetChildDeviceData.hasOwnProperty('c8y_IsDevice')) {
              const risks = this.calculateRiskCount(response);
              highRiskCount = risks.highRisk;
              mediumRiskCount = risks.mediumRisk;
              lowRiskCount = risks.lowRisk;
              noRiskCount = risks.noRisk;            }
            });
            await Promise.all(promises1);
          }
        }
      });
      await Promise.all(promises);
    }
    return {highRiskCount, mediumRiskCount, lowRiskCount, noRiskCount};
  }
// Calculate Risk counts of each risk type
  calculateRiskCount(device){
    let atRisk = false;
    let noRisk = 0;
    let lowRisk = 0;
    let mediumRisk = 0;
    let highRisk = 0;

    if (device) {
       const firmwareStatus = device.c8y_Firmware;
       let versionIssues = 0;
       if (firmwareStatus  && firmwareStatus.version) {
         versionIssues = firmwareStatus.version - this.latestFirmwareVersion;
        }
       if (versionIssues <= 0) {
          atRisk = true; }
       if ( atRisk) {
            if (atRisk) {
              if (versionIssues >= 0) {
                noRisk += 1;
              } else if (versionIssues === -1) {
                lowRisk += 1;
              } else if (versionIssues === -2) {
                mediumRisk += 1;
              } else if (versionIssues <= -3) {
                highRisk += 1;
              }
            }
        }
      }
      return {noRisk, lowRisk, mediumRisk, highRisk}
  }
  // To get Alarms
  async getAlarms(deviceId){
    let totalAlarms = 0;
    let majorAlertsCount = 0;
    let minorAlertsCount = 0;
    let criticalAlertsCount = 0;
    let response: any = null;
    const inventory = await this.inventory.detail(deviceId);
    response = inventory.data;

    if (response.hasOwnProperty('c8y_IsDevice')) {
      const alerts = this.calculateAlarmsCount(response);
      minorAlertsCount = alerts.minorAlerts;
      majorAlertsCount = alerts.majorAlerts;
      criticalAlertsCount = alerts.criticalAlerts;
    }
    else if(response.childAssets.references.length > 0){
      const promises = response.childAssets.references.map(async (childDevice) => {
        const childInventory = await this.inventory.detail(childDevice.managedObject.id);
        const childDeviceData = childInventory.data;
        if (childDeviceData.hasOwnProperty('c8y_IsDevice')) {
          const alerts = this.calculateAlarmsCount(childDeviceData);
          minorAlertsCount = alerts.minorAlerts;
          majorAlertsCount = alerts.majorAlerts;
        criticalAlertsCount = alerts.criticalAlerts;
        }
        else if(childDeviceData.hasOwnProperty('c8y_IsAsset')){
          if (childDeviceData.childAssets.references.length > 0) {
            const promises1 = childDeviceData.childAssets.references.map(async (assetChildDevice) => {
            const assetChildInventory = await this.inventory.detail(assetChildDevice.managedObject.id);
            const assetChildDeviceData = assetChildInventory.data;
            if (assetChildDeviceData.hasOwnProperty('c8y_IsDevice')) {
              const alerts = this.calculateAlarmsCount(assetChildDeviceData);
              minorAlertsCount = alerts.minorAlerts;
              majorAlertsCount = alerts.majorAlerts;
              criticalAlertsCount = alerts.criticalAlerts;
            }
            });
            await Promise.all(promises1);
          }
        }
      });
      await Promise.all(promises);
    }
    totalAlarms = majorAlertsCount + minorAlertsCount + criticalAlertsCount;
    return {totalAlarms, majorAlertsCount, minorAlertsCount, criticalAlertsCount};
  }

// count alarms of each type
  calculateAlarmsCount(device){
    let minorAlerts = 0;
    let majorAlerts = 0;
    let criticalAlerts = 0;
    const activeAlerts = device.c8y_ActiveAlarmsStatus;
    if (activeAlerts !== undefined) {
          if (activeAlerts.hasOwnProperty('minor')) {
            if (activeAlerts.minor > 0) { minorAlerts += device.c8y_ActiveAlarmsStatus.minor; }
          }
          if (activeAlerts.hasOwnProperty('major')) {
           if (activeAlerts.major > 0) { majorAlerts += device.c8y_ActiveAlarmsStatus.major }
         }
          if (activeAlerts.hasOwnProperty('critical')) {
           if (activeAlerts.critical > 0) { criticalAlerts += device.c8y_ActiveAlarmsStatus.critical }
         }
        }
        return {minorAlerts, majorAlerts, criticalAlerts}
  }
// To get KPi If any other KPI is added 
  async getNewKPICount(deviceId, newKPI){
    let newKPICount = 0;
    let response: any = null;
    const inventory = await this.inventory.detail(deviceId);
    response = inventory.data;
    if (response.hasOwnProperty('c8y_IsDevice') && response.hasOwnProperty(newKPI)) {
      newKPICount = 1;
    }
    else if(response.childAssets.references.length > 0){
      const promises = response.childAssets.references.map(async (childDevice) => {
        const childInventory = await this.inventory.detail(childDevice.managedObject.id);
        const childDeviceData = childInventory.data;
        if (childDeviceData.hasOwnProperty(newKPI)) {
          newKPICount += 1;
        }
        else if(childDeviceData.hasOwnProperty('c8y_IsAsset')){
          if (childDeviceData.childAssets.references.length > 0) {
            const promises1 = childDeviceData.childAssets.references.map(async (assetChildDevice) => {
            const assetChildInventory = await this.inventory.detail(assetChildDevice.managedObject.id);
            const assetChildDeviceData = assetChildInventory.data;
            if (assetChildDeviceData.hasOwnProperty(newKPI)) {
              newKPICount += 1;
            }
            });
            await Promise.all(promises1);
          }
        }
      });
      await Promise.all(promises);
    }
    else{
      newKPICount = 0;
    }
    return newKPICount;
  }
// get KPI Value of new other KPI
  async getNewKPIValue(deviceId, newKPI){
    let response: any = null;
    let newKPIValue;
    const inventory = await this.inventory.detail(deviceId);
    response = inventory.data;
    if (response.hasOwnProperty('c8y_IsDevice') && response.hasOwnProperty(newKPI)) {
      newKPIValue = response[newKPI];
    }
    else if(response.childAssets.references.length > 0){
      const promises = response.childAssets.references.map(async (childDevice) => {
        const childInventory = await this.inventory.detail(childDevice.managedObject.id);
        const childDeviceData = childInventory.data;
        if (childDeviceData.hasOwnProperty(newKPI)) {
          newKPIValue += response[newKPI];
        }
        else if(childDeviceData.hasOwnProperty('c8y_IsAsset')){
          if (childDeviceData.childAssets.references.length > 0) {
            const promises1 = childDeviceData.childAssets.references.map(async (assetChildDevice) => {
            const assetChildInventory = await this.inventory.detail(assetChildDevice.managedObject.id);
            const assetChildDeviceData = assetChildInventory.data;
            if (assetChildDeviceData.hasOwnProperty(newKPI)) {
              newKPIValue += response[newKPI];
            }
            });
            await Promise.all(promises1);
          }
        }
      });
      await Promise.all(promises);
    }
    else{
      newKPIValue = '';
    }
    return newKPIValue;
  }
}
