"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class RangeSettings {
    public show: boolean = false;
    public fontSize: number = 14;
}

export class VisualSettings extends DataViewObjectsParser {
    public range: RangeSettings = new RangeSettings();
}
