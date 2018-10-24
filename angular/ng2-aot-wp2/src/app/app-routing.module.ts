import { NgModule, ModuleWithProviders }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFound } from './not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: './+dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'wikipedia', 
        loadChildren: './+wikipedia/wikipedia.module#WikipediaModule'
    },
    { path: '**', component: NotFound }
];
const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
    imports: [routing],
    exports: [RouterModule]
})
export class AppRoutingModule {}
