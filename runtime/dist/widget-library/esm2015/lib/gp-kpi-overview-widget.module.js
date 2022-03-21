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
const ɵ0 = {
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
};
export class GpKpiOverviewWidgetModule {
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ncC1rcGktb3ZlcnZpZXctd2lkZ2V0L3NyYy9saWIvZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xGLE9BQU8sS0FBSyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDN0gsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztXQXVCL0U7SUFDTixFQUFFLEVBQUUscUJBQXFCO0lBQ3pCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtJQUNsQyxXQUFXLEVBQUUsY0FBYztJQUMzQixTQUFTLEVBQUUsNEJBQTRCO0lBQ3ZDLGVBQWUsRUFBRSxrQ0FBa0M7SUFDbkQsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFO2dCQUNULGNBQWMsRUFBRSxLQUFLO2dCQUNyQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsdUJBQXVCLEVBQUUsS0FBSztnQkFDOUIsZ0JBQWdCLEVBQUUsSUFBSTthQUNyQjtTQUNKO0tBQ0o7Q0FDSjtBQUdMLE1BQU0sT0FBTyx5QkFBeUI7OztZQTFDckMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWiw0QkFBNEI7b0JBQzVCLGtDQUFrQztvQkFDbEMsb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBQ2QsV0FBVztvQkFDWCxZQUFZO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsa0NBQWtDLENBQUM7Z0JBQzNFLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixFQUFFLGtDQUFrQyxDQUFDO2dCQUVuRixTQUFTLEVBQUU7b0JBQ1QsMEJBQTBCO29CQUMxQjt3QkFDQSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsS0FBSyxFQUFFLElBQUk7d0JBQ1gsUUFBUSxJQWlCUDtxQkFDQTtpQkFBQzthQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU29mdHdhcmUgQUcsIERhcm1zdGFkdCwgR2VybWFueSBhbmQvb3IgaXRzIGxpY2Vuc29yc1xuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIENvcmVNb2R1bGUsIEhPT0tfQ09NUE9ORU5UUyB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgR3BLcGlPdmVydmlld1dpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgcHJldmlldyBmcm9tICcuL3ByZXZpZXctaW1hZ2UnO1xuaW1wb3J0IHsgR3BLcGlPdmVydmlld1dpZGdldENvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC1jb25maWcvZ3Ata3BpLW92ZXJ2aWV3LXdpZGdldC1jb25maWcuY29tcG9uZW50JztcbmltcG9ydCB7IEdwS3BpT3ZlcnZpZXdXaWRnZXRTZXJ2aWNlIH0gZnJvbSAnLi9ncC1rcGktb3ZlcnZpZXctd2lkZ2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclNsaWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyL2NvbG9yLXNsaWRlci9jb2xvci1zbGlkZXItY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGFsZXR0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyL2NvbG9yLXBhbGV0dGUvY29sb3ItcGFsZXR0ZS1jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR3BLcGlPdmVydmlld1dpZGdldENvbXBvbmVudCxcbiAgICBHcEtwaU92ZXJ2aWV3V2lkZ2V0Q29uZmlnQ29tcG9uZW50LFxuICAgIENvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIENvbG9yU2xpZGVyQ29tcG9uZW50LFxuICAgIENvbG9yUGFsZXR0ZUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0dwS3BpT3ZlcnZpZXdXaWRnZXRDb21wb25lbnQsIEdwS3BpT3ZlcnZpZXdXaWRnZXRDb25maWdDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtHcEtwaU92ZXJ2aWV3V2lkZ2V0Q29tcG9uZW50LCBHcEtwaU92ZXJ2aWV3V2lkZ2V0Q29uZmlnQ29tcG9uZW50XSxcblxuICBwcm92aWRlcnM6IFtcbiAgICBHcEtwaU92ZXJ2aWV3V2lkZ2V0U2VydmljZSxcbiAgICB7XG4gICAgcHJvdmlkZTogSE9PS19DT01QT05FTlRTLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIGlkOiAna3BpLW92ZXJ2aWV3LndpZGdldCcsXG4gICAgICAgIGxhYmVsOiAnS1BJIE92ZXJ2aWV3JyxcbiAgICAgICAgcHJldmlld0ltYWdlOiBwcmV2aWV3LnByZXZpZXdJbWFnZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdLUEkgT3ZlcnZpZXcnLFxuICAgICAgICBjb21wb25lbnQ6IEdwS3BpT3ZlcnZpZXdXaWRnZXRDb21wb25lbnQsXG4gICAgICAgIGNvbmZpZ0NvbXBvbmVudDogR3BLcGlPdmVydmlld1dpZGdldENvbmZpZ0NvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmcxOiB7XG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIG5vRGV2aWNlVGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBub05ld1dpZGdldHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRldmljZVRhcmdldE5vdFJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBncm91cHNTZWxlY3RhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBHcEtwaU92ZXJ2aWV3V2lkZ2V0TW9kdWxlIHsgfVxuIl19