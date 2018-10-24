import { NgModule, ModuleWithProviders }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent }
];
const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [routing],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
