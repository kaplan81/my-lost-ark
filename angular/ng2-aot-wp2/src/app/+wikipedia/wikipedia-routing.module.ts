import { NgModule, ModuleWithProviders }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WikipediaComponent } from './wikipedia.component';

export const routes: Routes = [
    { path: '', component: WikipediaComponent }
];
const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [routing],
    exports: [RouterModule]
})
export class WikipediaRoutingModule {}
