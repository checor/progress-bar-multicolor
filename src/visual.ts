"use strict";
import powerbi from "powerbi-visuals-api";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {ReactProgressBar, initialState } from "./component";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";

import "./../style/visual.less";

export class Visual implements IVisual {

    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private settings: VisualSettings;
  
    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(ReactProgressBar, {});
        this.target = options.element;
  
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {

        if(options.dataViews && options.dataViews[0]){
            const dataView: DataView = options.dataViews[0];
            const data: any = dataView.table.rows;
            if (!data || data.length == 0){
                this.clear();
                return;
            }
            if (data[0].length == 3){
                console.log(typeof data[0][2]);
                data.sort((a, b) => new Date(a[2]).getTime() - new Date(b[2]).getTime());
            }
            ReactProgressBar.update({
                widths: data.map(x => x[0]),
                colors: data.map(x => x[1]),
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactProgressBar.update(initialState);
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}
