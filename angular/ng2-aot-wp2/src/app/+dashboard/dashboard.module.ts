import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardChartComponent } from './dashboard-chart.component';
import { DashboarTableComponent } from './dashboard-table.component';

@NgModule({
    declarations: [DashboardComponent, DashboardChartComponent, DashboarTableComponent],
    imports: [DashboardRoutingModule, SharedModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }
