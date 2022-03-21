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
import { NgModule } from '@angular/core';
import { CommonModule, CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { GpKpiOverviewWidgetComponent } from './gp-kpi-overview-widget.component';
import * as preview from './preview-image';
import { GpKpiOverviewWidgetConfigComponent } from './gp-kpi-overview-widget-config/gp-kpi-overview-widget-config.component';
import { GpKpiOverviewWidgetService } from './gp-kpi-overview-widget.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker/color-picker-component';
import { ColorSliderComponent } from './color-picker/color-slider/color-slider-component';
import { ColorPaletteComponent } from './color-picker/color-palette/color-palette-component';
@NgModule({
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
    useValue: {
        id: 'kpi-overview.widget',
        label: 'KPI Overview',
        previewImage: preview.previewImage,
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
    }
    }],
})
export class GpKpiOverviewWidgetModule { }
