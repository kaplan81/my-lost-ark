import {Injectable, EventEmitter} from '@angular/core';

/**
 * EmitterService takes care of @Output events that are not meant to be passed
 * to parent components but to siblings or other relatives.
 * 
 * EmitterService.get() gets the EventEmitter for the corresponding id and
 * if it doesn't exist it creates it.
 * 
 * @export
 * @class EmitterService
 */
@Injectable()
export class EmitterService {
    private emitters: { [id: string]: EventEmitter<any> } = {};

    get(id: string): EventEmitter<any> {
        if (!this.emitters[id]) 
            this.emitters[id] = new EventEmitter();
        return this.emitters[id];
    }
}
