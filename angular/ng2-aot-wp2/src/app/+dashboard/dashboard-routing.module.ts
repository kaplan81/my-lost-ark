import { NgModule, ModuleWithProviders }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardChartComponent } from './dashboard-chart.component';
import { DashboarTableComponent } from './dashboard-table.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'chart',
                component: DashboardChartComponent
            },
            {
                path: 'table',
                component: DashboarTableComponent
            }
        ]
    }
];
const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [routing],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}



