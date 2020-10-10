"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class ProgressBarSettings {
    public show: boolean = true;
    public fontSize: number = 12;
}

export class VisualSettings extends DataViewObjectsParser {
    public circle: ProgressBarSettings = new ProgressBarSettings();
}
