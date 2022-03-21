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
import { Component, Output, EventEmitter, ElementRef, } from '@angular/core';
export class ColorPickerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dwLWtwaS1vdmVydmlldy13aWRnZXQvc3JjL2xpYi9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFFWixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFRdkIsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjFCLGFBQVEsR0FBeUIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsc0JBQWlCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJakUsY0FBUyxHQUFRLE1BQU0sQ0FBQztJQUNRLENBQUM7SUFFeEMsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztTQUNGO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJO1FBQ2IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQyxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUVsRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUNwQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUNwQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUNwQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUVwQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCwrQ0FBK0M7Z0JBQy9DLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGd6QkFBNEM7O2FBRTdDOzs7WUFSQyxVQUFVOzs7dUJBVVQsTUFBTTtnQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU29mdHdhcmUgQUcsIERhcm1zdGFkdCwgR2VybWFueSBhbmQvb3IgaXRzIGxpY2Vuc29yc1xuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2FwcC1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLWNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29sb3ItcGlja2VyLWNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJDb21wb25lbnQge1xuICBAT3V0cHV0KCkgY29sb3JTZXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIGNvbG9yUGlja2VyQ2xvc2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGh1ZTogc3RyaW5nO1xuICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgcHVibGljIGNvbG9yVHlwZTogYW55ID0gJ2hleGEnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgY2xvc2VDb2xvclBpY2tlcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyQ2xvc2VkLmVtaXQodHJ1ZSk7XG4gIH1cbiAgYXBwbHlDb2xvckNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuY29sb3JUeXBlID09PSAnaGV4YScpIHtcbiAgICAgICAgdGhpcy5jb2xvclNldC5lbWl0KHRoaXMuUkdCQVRvSGV4QSh0aGlzLmNvbG9yKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbG9yU2V0LmVtaXQodGhpcy5jb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgUkdCQVRvSGV4QShyZ2JhKSB7XG4gICAgY29uc3Qgc2VwID0gcmdiYS5pbmRleE9mKCcsJykgPiAtMSA/ICcsJyA6ICcgJztcbiAgICByZ2JhID0gcmdiYS5zdWJzdHIoNSkuc3BsaXQoJyknKVswXS5zcGxpdChzZXApO1xuXG4gICAgLy8gU3RyaXAgdGhlIHNsYXNoIGlmIHVzaW5nIHNwYWNlLXNlcGFyYXRlZCBzeW50YXhcbiAgICBpZiAocmdiYS5pbmRleE9mKCcvJykgPiAtMSkgeyByZ2JhLnNwbGljZSgzLCAxKTsgfVxuXG4gICAgbGV0IHIgPSAoK3JnYmFbMF0pLnRvU3RyaW5nKDE2KTtcbiAgICBsZXQgZyA9ICgrcmdiYVsxXSkudG9TdHJpbmcoMTYpO1xuICAgIGxldCAgYiA9ICgrcmdiYVsyXSkudG9TdHJpbmcoMTYpO1xuICAgIGxldCAgYSA9IE1hdGgucm91bmQoK3JnYmFbM10gKiAyNTUpLnRvU3RyaW5nKDE2KTtcblxuICAgIGlmIChyLmxlbmd0aCA9PT0gMSkgeyByID0gJzAnICsgcjsgfVxuICAgIGlmIChnLmxlbmd0aCA9PT0gMSkgeyBnID0gJzAnICsgZzsgfVxuICAgIGlmIChiLmxlbmd0aCA9PT0gMSkgeyBiID0gJzAnICsgYjsgfVxuICAgIGlmIChhLmxlbmd0aCA9PT0gMSkgeyBhID0gJzAnICsgYTsgfVxuXG4gICAgcmV0dXJuICcjJyArIHIgKyBnICsgYiArIGE7XG4gIH1cbn1cbiJdfQ==