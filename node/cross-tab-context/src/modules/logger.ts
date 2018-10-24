declare var window: any;

/**
 * We activate traces for this library by setting typing this on the browser console:
 * window.StorageLogger = true
 * 
 * @export
 * @class Logger
 */
export class Logger {
  static log(messageTrace: string, level?: string) {
    if(!!window.top.StorageLogger) {
        switch(level) {
            case 'log':
                console.log('[cross-tab-context-log] - ' + messageTrace);
                break;
            case 'info':
                console.info('[cross-tab-context-info] - ' + messageTrace);
                break;
            case 'warn':
                console.warn('[cross-tab-context-warn] - ' + messageTrace);
            case 'error':
                console.error('[cross-tab-context-error] - ' + messageTrace);
            default:
                console.log('[cross-tab-context-log] - ' + messageTrace);
        }
    }
  }
}
