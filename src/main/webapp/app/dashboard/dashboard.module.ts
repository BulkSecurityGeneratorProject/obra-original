import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ObrasBarchartModule } from './barchart/barchart.module';
import { ObrasDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { ObrasLinechartModule } from './linechart/linechart.module';
import { ObrasPiechartModule } from './piechart/piechart.module';
import { ObrasPolarareachartModule } from './polarareachart/polarareachart.module';
import { ObrasRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        ObrasBarchartModule,
        ObrasDoughnutchartModule,
        ObrasLinechartModule,
        ObrasPiechartModule,
        ObrasPolarareachartModule,
        ObrasRadarchartModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ObrasDashboardModule {}