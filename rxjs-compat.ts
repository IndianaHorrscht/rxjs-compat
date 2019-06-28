/**
 * Starting with RXJS 6 the operators come separately from the main Observable object. This file restores backwards
 * compatibility for the most important ones so that we do not have to change dozens of usages while upgrading.
 */

import { Observable } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';

declare module 'rxjs/internal/Observable' {
    interface Observable<T> {
        filter: (callback: (predicate: any, index: number) => boolean, thisArg?: any) => Observable<T>;
        finally: (callback: () => void) => Observable<T>;
        map: (callback: (value: any) => any) => Observable<T>;
    }
}

Observable.prototype['filter'] = function (callback, thisArg?: any) {
    return this.pipe(filter(callback, thisArg));
};
Observable.prototype['finally'] = function (callback) {
    return this.pipe(finalize(callback));
};
Observable.prototype['map'] = function (callback, thisArg?: any) {
    return this.pipe(map(callback, thisArg));
};
