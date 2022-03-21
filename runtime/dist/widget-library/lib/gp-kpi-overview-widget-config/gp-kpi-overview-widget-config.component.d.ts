import { OnInit } from '@angular/core';
export declare class GpKpiOverviewWidgetConfigComponent implements OnInit {
    config: any;
    kpiColorPickerClosed: boolean;
    kpiBgColorPickerClosed: boolean;
    titleColorPickerClosed: boolean;
    kpiUnitColorPickerClosed: boolean;
    messageColorPickerClosed: boolean;
    widgetInfo: {
        metadata: {
            title: string;
            icon: string;
        };
        kpi: {
            color: string;
            unit: string;
            bgcolor: string;
            kpiName: string;
            message: string;
            otherKPIValue: string;
            otherKPIName: string;
            titleColor: string;
            unitColor: string;
            messageColor: string;
            titleSize: number;
            messageSize: number;
            unitSize: number;
            kpiSize: number;
            imageSize: number;
        };
    };
    kpiNamesList: {
        id: string;
        text: string;
    }[];
    constructor();
    ngOnInit(): Promise<void>;
    updateIconInConfig($event: Event): void;
    updateConfig(): void;
    setSelectedColorForKPI(value: string): void;
    closeKPIColorPicker(): void;
    openKPIColorPicker(): void;
    setSelectedColorForTitle(value: string): void;
    closeTitleColorPicker(): void;
    openTitleColorPicker(): void;
    setSelectedColorForKPIUnit(value: string): void;
    closeKPIUnitColorPicker(): void;
    openKPIUnitColorPicker(): void;
    setSelectedColorForMessage(value: string): void;
    closeMessageColorPicker(): void;
    openMessageColorPicker(): void;
    closeKPIBgColorPicker(): void;
    openKPIBgColorPicker(): void;
    setSelectedColorForBackground(value: string): void;
}
