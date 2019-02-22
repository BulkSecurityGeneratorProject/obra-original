import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/primeng';

import { ObrasSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [ObrasSharedModule, ChartModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ObrasHomeModule {}
