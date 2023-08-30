
  # Cumulocity KPI Overview Widget[<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>](https://github.com/SoftwareAG/cumulocity-kpi-overview-widget/releases/download/2.0.0/kpi-overview-runtime-widget-2.0.0.zip)
The Cumulocity KPI Overview Widget help you to display the Device KPIs with customised KPI Name, icon, text, color and size.

> ### ⚠️ This project is no longer under development. Please use [cumulocity-kpi-overview-plugin](https://github.com/SoftwareAG/cumulocity-kpi-overview-plugin) for Application Builder >=2.x.x and Cumulocity >=1016.x.x⚠️


### Please choose Cumulocity KPI Overview Widget release based on Cumulocity/Application builder version:

|APPLICATION BUILDER | CUMULOCITY | Cumulocity KPI Overview Widget |
|--------------------|------------|-----------------------|
| 1.3.x              | >= 1011.x.x| 2.x.x                 |

![kpioverview](https://user-images.githubusercontent.com/16031030/159650661-e1fe4d62-5724-432a-af60-d25b6d922f12.jpg)


## Features

  
*  **Display Device data:** Displays Device data kpis for selected Device/Asset.

*  **KPI Name:** Configurable KPI Name with customized color and size.

*  **Icon:** User can choose icon to display for KPI with customized size and color.

*  **Text:** Ability to show brief text for KPI with required color and size.

  

## Installation

  
### Runtime Widget Deployment?

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-kpi-overview-widget/releases/download/2.0.0/kpi-overview-runtime-widget-2.0.0.zip)  and follow runtime deployment instructions.
  

### Installation of widget through App Builder
  

**Supported Cumulocity Environments:**
  

*  **App Builder:** Tested with Cumulocity App Builder version 1.3.0.  
  
**Requirements:**

* Git

* NodeJS (release builds are currently built with `v14.18.0`)

* NPM (Included with NodeJS)

**External dependencies:**

```

"@angular/material": "^11.1.2"

"ngx-bootstrap": "6.2.0"

"@ng-select/ng-select": "^6.1.0"

```

**Installation Steps For App Builder:**


**Note:** If you are new to App Builder or not yet downloaded/clone app builder code then please follow [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder) before proceeding further.



1. Open Your existing App Builder project and install external dependencies by executing below command or install it manually.

    ```

    npm i @angular/material@11.1.2 ngx-bootstrap@6.2.0 @ng-select/ng-select@6.1.0"

    ```
2. Grab the KPI Overview widget **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-kpi-overview-widget/releases/download/2.0.0/gp-kpi-overview-widget-2.0.0.tgz)**.


3. Install the Binary file in app builder.

    ```
    
    npm i <binary file path>/gp-kpi-overview-widget-x.x.x.tgz

    ```

4. Import GpKpiOverviewWidgetModule in custom-widget.module.ts file located at /cumulocity-app-builder/custom-widgets/

    ```  

    import {GpKpiOverviewWidgetModule} from  'gp-kpi-overview-widget';

    @NgModule({

    imports: [

    GpKpiOverviewWidgetModule

    ]

    })

    ```

9. Congratulation! Installation is now completed. Now you can run app builder locally or build and deploy it into your tenant.

    ```

    //Start App Builder

    
    npm run start

    // Build App


    npm run build


    // Deploy App


    npm run deploy


    ```

## Build Instructions

**Note:** It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the [Installation Guide](#Installation).

**Requirements:**
  
* Git  

* NodeJS (release builds are currently built with `v14.18.0`)
  

* NPM (Included with NodeJS)
  

**Instructions**


1. Clone the repository:

    ```  

    git clone https://github.com/SoftwareAG/cumulocity-kpi-overview-widget.git

    ```

2. Change directory:

    ```

    cd gp-kpi-overview-widget

    ```

3. (Optional) Checkout a specific version:

    ```

    git checkout <your version>
    
    ```  

4. Install the dependencies:

    ```

    npm install

    ```

5. (Optional) Local development server:

    ```

    ng serve

    ```

6. Build the app:

    ```

    npm run buildPatch

    ```

7. Deploy the app: Follow the [Installation instructions](#Installation)

## QuickStart
  

This guide will teach you how to add widget in your existing or new dashboard.

  

**NOTE:** This guide assumes you have followed the [Installation instructions](#Installation)

  

1. Open your application from App Switcher
  

2. Add new dashboard or navigate to existing dashboard
  

3. Click `Add Widget`
  

4. Search for `KPI Overview`


5. Select `Target Assets or Devices`


6. Click `Save`


Congratulations! KPI Overview widget is configured.

  

## User Guide

*  **Display Device data:** Displays Device data kpis for selected Device/Asset.

*  **KPI Name:** Configurable KPI Name with customized color and size.

*  **Icon:** User can choose icon to display for KPI with customized size and color.

*  **Text:** Ability to show brief text for KPI with required color and size.

*  **Device/ Asset:** Ability to select device or asset to get data.

*  **KPI Title:** User has to provide the title for the KPI selected. The title font size and color can be customized.
*  **Upload KPI Icon:** User can upload an icon of choice for the selected KPI that will be shown in widget and size can be customized.
*  **KPI:** User has to select one KPI from the list of KPIs in the dropdown. The size and color of the KPI can be customized. The available KPIs are Total Devices, Available Devices, Unavailable Devices, Total Alarms, Major Alarms, Minor Alarms, Critical Alarms, Firmware Risks and any other field of Device.
*  **KPI Unit:** User can provide the Unit for the selected KPI with customized font color and size.
*  **KPI Message:** User can provide a custom message about the selected KPI.

 
  

------------------------------

This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.

_____________________

For more information you can Ask a Question in the [TECHcommunity Forums](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).
