import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from './core.config';
import { NavigationRoutesModel } from './navigation-routes.model';

/**
 * The CoreService provides an injectable application wide configuration singleton.
 * 
 * @export
 * @class CoreService
 */
@Injectable()
export class CoreService {
    public navigationRoutes: NavigationRoutesModel;

    constructor( @Optional() config: CoreConfig) {
        if (config) {
            this.navigationRoutes = config.navigationRoutes;
        }
    }
}
