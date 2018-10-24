import { NavigationRoutesModel } from './navigation-routes.model';

/**
 * Application wide configuration items used to instantiate a
 * configuration singleton in the AppModule
 * 
 * @see app.module.ts
 * @see CoreService
 * 
 * @export
 * @class CoreConfig
 */
export class CoreConfig {
    // Navigation routes for the corresponding application.
    public navigationRoutes: NavigationRoutesModel;
}
