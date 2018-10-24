import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFound } from './not-found.component';

@NgModule({
    imports: [RouterModule],
    exports: [NotFound],
    declarations: [NotFound]
})
export class NotFoundModule { }
