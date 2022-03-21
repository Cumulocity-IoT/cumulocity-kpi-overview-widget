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
import { AfterViewInit, OnInit } from '@angular/core';
import { GpKpiOverviewWidgetService } from './gp-kpi-overview-widget.service';
export declare class GpKpiOverviewWidgetComponent implements OnInit, AfterViewInit {
    private kpiService;
    config: any;
    private device;
    private kpi;
    constructor(kpiService: GpKpiOverviewWidgetService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private configureTopMarginRequired;
    getDeviceData(): Promise<void>;
    getKPITitle(): string;
    getKPITitleTopMargin(): string;
    getKPIIcon(): string;
    getKPIContainerHeight(): string;
    getKPIValue(): any;
    getKPIUnit(): string;
    getKPIName(): string;
    getKPIColor(): string;
    getTitleColor(): string;
    getUnitColor(): string;
    getMessageColor(): string;
    getKPIBgColor(): string;
    getOtherKPIName(): string;
    getOtherKPIMetric(): string;
    getKPIMessage(): string;
    getKPISize(): string;
    getTitleSize(): string;
    getMessageSize(): string;
    getUnitSize(): string;
    getImageSize(): string;
    getContainerHeight(): string;
}
