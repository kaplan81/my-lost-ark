// Angular 2 imports are not needed in dev mode.
// They are not needed in prod mode either
// and that is because main-aot.ts is importing exactly what it needs from angular:
// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

// TODO: check if RxJS imports are needed.
// import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
// TODO: check other vendors such as Lodash or Bootstrap

